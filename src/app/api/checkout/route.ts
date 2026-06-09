import { NextResponse } from "next/server";
import { createMolliePayment } from "@/lib/shop/mollie";
import { createPendingGiftCardOrder, updateOrder } from "@/lib/shop/orders";
import {
  GIFT_CARD_PRODUCT_ID,
  isValidGiftCardAmount,
} from "@/lib/shop/products";
import type { CheckoutRequest } from "@/lib/shop/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;

    if (body.productId !== GIFT_CARD_PRODUCT_ID) {
      return NextResponse.json({ error: "Onbekend product." }, { status: 400 });
    }

    if (!isValidGiftCardAmount(body.amountCents)) {
      return NextResponse.json(
        { error: "Kies een cadeaukaartbedrag tussen €20 en €250." },
        { status: 400 }
      );
    }

    if (!body.customerName?.trim() || !body.customerEmail?.trim()) {
      return NextResponse.json(
        { error: "Naam en e-mail zijn verplicht." },
        { status: 400 }
      );
    }

    const order = await createPendingGiftCardOrder({
      totalCents: body.amountCents,
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail.trim().toLowerCase(),
      recipientName: body.recipientName?.trim(),
      recipientEmail: body.recipientEmail?.trim().toLowerCase(),
      personalMessage: body.personalMessage?.trim(),
    });

    const payment = await createMolliePayment({
      orderId: order.id,
      amountCents: order.total_cents,
      customerEmail: order.customer_email,
    });

    await updateOrder(order.id, {
      mollie_payment_id: payment.paymentId,
      mollie_checkout_url: payment.checkoutUrl,
    });

    return NextResponse.json({
      checkoutUrl: payment.checkoutUrl,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Betaling starten is niet gelukt.",
      },
      { status: 500 }
    );
  }
}
