import type { ShopProduct } from "@/lib/shop/types";

export const GIFT_CARD_PRODUCT_ID = "gift-card";

export const GIFT_CARD_AMOUNTS_CENTS = [2500, 5000, 7500, 10000, 15000];

export const MIN_GIFT_CARD_AMOUNT_CENTS = 2000;
export const MAX_GIFT_CARD_AMOUNT_CENTS = 25000;

export const GIFT_CARD_PRODUCT: ShopProduct = {
  id: GIFT_CARD_PRODUCT_ID,
  name: "Flawless Beauty cadeaukaart",
  description: "Digitale cadeaukaart voor behandelingen bij Flawless Beauty.",
  type: "gift_card",
  active: true,
  imageUrl: "/img/studio-giftcard.jpeg",
};

export function isValidGiftCardAmount(amountCents: number) {
  return (
    Number.isInteger(amountCents) &&
    amountCents >= MIN_GIFT_CARD_AMOUNT_CENTS &&
    amountCents <= MAX_GIFT_CARD_AMOUNT_CENTS
  );
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
