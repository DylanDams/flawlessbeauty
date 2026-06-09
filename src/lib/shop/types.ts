export type Currency = "EUR";

export type ProductType = "gift_card" | "physical";

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "failed"
  | "cancelled"
  | "refunded";

export type GiftCardStatus =
  | "active"
  | "partially_redeemed"
  | "redeemed"
  | "expired"
  | "void";

export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  priceCents?: number;
  imageUrl?: string;
  active: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
  unitPriceCents?: number;
};

export type GiftCardCheckoutRequest = {
  productId: "gift-card";
  amountCents: number;
  customerName: string;
  customerEmail: string;
  recipientName?: string;
  recipientEmail?: string;
  personalMessage?: string;
};

export type CheckoutRequest = GiftCardCheckoutRequest;

export type CheckoutResponse = {
  checkoutUrl: string;
  orderId: string;
};

export type CheckoutErrorResponse = {
  error: string;
};

export type OrderRecord = {
  id: string;
  status: OrderStatus;
  currency: Currency;
  total_cents: number;
  customer_name: string;
  customer_email: string;
  recipient_name: string | null;
  recipient_email: string | null;
  personal_message: string | null;
  mollie_payment_id: string | null;
  mollie_checkout_url: string | null;
  fulfilled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItemRecord = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  total_cents: number;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type GiftCardRecord = {
  id: string;
  order_id: string;
  code_hash: string;
  code_suffix: string;
  initial_value_cents: number;
  remaining_value_cents: number;
  currency: Currency;
  status: GiftCardStatus;
  expires_at: string | null;
  sent_at: string | null;
  last_email_error: string | null;
  created_at: string;
  updated_at: string;
};

export type GiftCardAdminView = {
  id: string;
  orderId: string;
  codeSuffix: string;
  initialValueCents: number;
  remainingValueCents: number;
  status: GiftCardStatus;
  customerName: string;
  customerEmail: string;
  recipientName: string | null;
  recipientEmail: string | null;
  createdAt: string;
  sentAt: string | null;
};
