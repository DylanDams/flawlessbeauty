import { eq, supabaseRequest } from "@/lib/supabase/rest";
import { hashGiftCardCode } from "@/lib/shop/giftcards";
import type {
  GiftCardAdminView,
  GiftCardRecord,
  GiftCardStatus,
  OrderItemRecord,
  OrderRecord,
  OrderStatus,
} from "@/lib/shop/types";

type CreateOrderInput = {
  totalCents: number;
  customerName: string;
  customerEmail: string;
  recipientName?: string;
  recipientEmail?: string;
  personalMessage?: string;
};

type UpdateOrderInput = Partial<{
  status: OrderStatus;
  mollie_payment_id: string;
  mollie_checkout_url: string;
  fulfilled_at: string | null;
}>;

export async function createPendingGiftCardOrder(input: CreateOrderInput) {
  const orderId = crypto.randomUUID();
  const order = await insertSingle<OrderRecord>("orders", {
    id: orderId,
    status: "pending",
    currency: "EUR",
    total_cents: input.totalCents,
    customer_name: input.customerName,
    customer_email: input.customerEmail,
    recipient_name: input.recipientName || null,
    recipient_email: input.recipientEmail || null,
    personal_message: input.personalMessage || null,
  });

  await insertSingle<OrderItemRecord>("order_items", {
    order_id: order.id,
    product_id: "gift-card",
    product_name: "Flawless Beauty cadeaukaart",
    quantity: 1,
    unit_price_cents: input.totalCents,
    total_cents: input.totalCents,
    metadata: { delivery: "email" },
  });

  return order;
}

export async function updateOrder(orderId: string, input: UpdateOrderInput) {
  return updateSingle<OrderRecord>(`orders?id=${eq(orderId)}`, input);
}

export async function getOrderByMolliePaymentId(paymentId: string) {
  const rows = await supabaseRequest<OrderRecord[]>(
    `orders?mollie_payment_id=${eq(paymentId)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function getOrderById(orderId: string) {
  const rows = await supabaseRequest<OrderRecord[]>(`orders?id=${eq(orderId)}&limit=1`);
  return rows[0] ?? null;
}

export async function getGiftCardByOrderId(orderId: string) {
  const rows = await supabaseRequest<GiftCardRecord[]>(
    `gift_cards?order_id=${eq(orderId)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function getGiftCardById(giftCardId: string) {
  const rows = await supabaseRequest<GiftCardRecord[]>(
    `gift_cards?id=${eq(giftCardId)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function createGiftCard(input: {
  orderId: string;
  codeHash: string;
  codeSuffix: string;
  valueCents: number;
  expiresAt: string;
}) {
  return insertSingle<GiftCardRecord>("gift_cards", {
    order_id: input.orderId,
    code_hash: input.codeHash,
    code_suffix: input.codeSuffix,
    initial_value_cents: input.valueCents,
    remaining_value_cents: input.valueCents,
    currency: "EUR",
    status: "active",
    expires_at: input.expiresAt,
  });
}

export async function markGiftCardEmailSent(giftCardId: string) {
  return updateSingle<GiftCardRecord>(`gift_cards?id=${eq(giftCardId)}`, {
    sent_at: new Date().toISOString(),
    last_email_error: null,
  });
}

export async function markGiftCardEmailError(giftCardId: string, error: string) {
  return updateSingle<GiftCardRecord>(`gift_cards?id=${eq(giftCardId)}`, {
    last_email_error: error,
  });
}

export async function updateUnsentGiftCardCode(input: {
  giftCardId: string;
  codeHash: string;
  codeSuffix: string;
}) {
  return updateSingle<GiftCardRecord>(`gift_cards?id=${eq(input.giftCardId)}`, {
    code_hash: input.codeHash,
    code_suffix: input.codeSuffix,
    last_email_error: null,
  });
}

export async function findGiftCardForAdmin(query: string): Promise<GiftCardAdminView[]> {
  const normalized = query.trim();
  if (!normalized) return [];

  const codeLike = normalized.toUpperCase().startsWith("FB-");
  const byCode = codeLike
    ? await supabaseRequest<GiftCardRecord[]>(
        `gift_cards?code_hash=${eq(hashGiftCardCode(normalized))}&limit=1`
      )
    : await supabaseRequest<GiftCardRecord[]>(
        `gift_cards?code_suffix=${eq(normalized.slice(-4).toUpperCase())}&limit=10`
      );

  const orderIds = new Set(byCode.map((card) => card.order_id));

  if (normalized.length >= 8 && /^[0-9a-f-]+$/i.test(normalized)) {
    const order = await getOrderById(normalized);
    if (order) orderIds.add(order.id);
  }

  if (normalized.includes("@")) {
    const orders = await supabaseRequest<OrderRecord[]>(
      `orders?or=(customer_email.${eq(normalized)},recipient_email.${eq(normalized)})&limit=10`
    );
    orders.forEach((order) => orderIds.add(order.id));
  }

  if (!orderIds.size) return [];

  const rows = await Promise.all(
    [...orderIds].map(async (orderId) => {
      const [order, card] = await Promise.all([
        getOrderById(orderId),
        getGiftCardByOrderId(orderId),
      ]);

      if (!order || !card) return null;

      return {
        id: card.id,
        orderId: order.id,
        codeSuffix: card.code_suffix,
        initialValueCents: card.initial_value_cents,
        remainingValueCents: card.remaining_value_cents,
        status: card.status,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        recipientName: order.recipient_name,
        recipientEmail: order.recipient_email,
        createdAt: card.created_at,
        sentAt: card.sent_at,
      };
    })
  );

  return rows.filter((row): row is GiftCardAdminView => row !== null);
}

export async function redeemGiftCard(input: {
  giftCardId: string;
  amountCents: number;
  staffNote?: string;
}) {
  const current = await getGiftCardById(input.giftCardId);
  if (!current) {
    throw new Error("Cadeaukaart niet gevonden.");
  }

  if (!["active", "partially_redeemed"].includes(current.status)) {
    throw new Error("Deze cadeaukaart is niet actief.");
  }

  if (input.amountCents > current.remaining_value_cents) {
    throw new Error("Het af te boeken bedrag is hoger dan het resterende saldo.");
  }

  const remaining = Math.max(current.remaining_value_cents - input.amountCents, 0);
  const status: GiftCardStatus = remaining === 0 ? "redeemed" : "partially_redeemed";

  await insertSingle("gift_card_redemptions", {
    gift_card_id: input.giftCardId,
    amount_cents: input.amountCents,
    staff_note: input.staffNote || null,
  });

  return updateSingle<GiftCardRecord>(`gift_cards?id=${eq(input.giftCardId)}`, {
    remaining_value_cents: remaining,
    status,
  });
}

export async function hasWebhookEvent(provider: string, providerEventId: string) {
  const rows = await supabaseRequest<Array<{ id: string }>>(
    `webhook_events?provider=${eq(provider)}&provider_event_id=${eq(providerEventId)}&limit=1`
  );
  return rows.length > 0;
}

export async function recordWebhookEvent(
  provider: string,
  providerEventId: string,
  payload: Record<string, unknown>
) {
  await insertSingle("webhook_events", {
    provider,
    provider_event_id: providerEventId,
    payload,
  });
}

async function insertSingle<T>(table: string, body: Record<string, unknown>) {
  const rows = await supabaseRequest<T[]>(table, {
    method: "POST",
    body,
    prefer: "return=representation",
  });
  return rows[0];
}

async function updateSingle<T>(path: string, body: Record<string, unknown>) {
  const rows = await supabaseRequest<T[]>(path, {
    method: "PATCH",
    body,
    prefer: "return=representation",
  });
  return rows[0];
}
