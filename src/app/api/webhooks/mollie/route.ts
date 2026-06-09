import { NextResponse } from "next/server";

import { sendGiftCardEmail } from "@/lib/email/giftcard";
import {
  createGiftCard,
  getGiftCardByOrderId,
  getOrderByMolliePaymentId,
  hasWebhookEvent,
  markGiftCardEmailError,
  markGiftCardEmailSent,
  recordWebhookEvent,
  updateUnsentGiftCardCode,
  updateOrder,
} from "@/lib/shop/orders";
import { getMolliePayment } from "@/lib/shop/mollie";
import {
  createGiftCardCode,
  giftCardExpiresAt,
  giftCardSuffix,
  hashGiftCardCode,
} from "@/lib/shop/giftcards";

export async function POST(request: Request) {
  const formData = await request.formData();
  const paymentId = String(formData.get("id") ?? "");

  if (!paymentId) {
    return NextResponse.json({ error: "Missing Mollie payment id" }, { status: 400 });
  }

  try {
    if (await hasWebhookEvent("mollie", paymentId)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const payment = await getMolliePayment(paymentId);
    const order = await getOrderByMolliePaymentId(payment.id);

    if (!order) {
      throw new Error(`No order found for Mollie payment ${payment.id}`);
    }

    if (payment.status !== "paid") {
      if (["failed", "canceled", "expired"].includes(payment.status)) {
        await updateOrder(order.id, {
          status: payment.status === "canceled" ? "cancelled" : "failed",
        });
      }

      await recordWebhookEvent("mollie", paymentId, { status: payment.status });
      return NextResponse.json({ ok: true, status: payment.status });
    }

    await updateOrder(order.id, { status: "paid" });

    let giftCard = await getGiftCardByOrderId(order.id);
    let code: string | null = null;

    if (!giftCard) {
      code = createGiftCardCode();
      giftCard = await createGiftCard({
        orderId: order.id,
        codeHash: hashGiftCardCode(code),
        codeSuffix: giftCardSuffix(code),
        valueCents: order.total_cents,
        expiresAt: giftCardExpiresAt(),
      });
    } else if (!giftCard.sent_at) {
      code = createGiftCardCode();
      giftCard = await updateUnsentGiftCardCode({
        giftCardId: giftCard.id,
        codeHash: hashGiftCardCode(code),
        codeSuffix: giftCardSuffix(code),
      });
    }

    if (!giftCard.sent_at) {
      try {
        if (!code) {
          throw new Error("Gift card code is unavailable for email delivery.");
        }

        await sendGiftCardEmail({ order, code });
        await markGiftCardEmailSent(giftCard.id);
      } catch (emailError) {
        await markGiftCardEmailError(
          giftCard.id,
          emailError instanceof Error ? emailError.message : "Unknown email error"
        );
        throw emailError;
      }
    }

    await updateOrder(order.id, {
      status: "fulfilled",
      fulfilled_at: new Date().toISOString(),
    });
    await recordWebhookEvent("mollie", paymentId, { status: payment.status });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Mollie webhook failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Mollie webhook verwerken is mislukt.",
      },
      { status: 500 }
    );
  }
}
