import { createHash, randomBytes } from "crypto";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function createGiftCardCode() {
  const bytes = randomBytes(8);
  let raw = "";

  for (const byte of bytes) {
    raw += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  }

  return `FB-${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
}

export function hashGiftCardCode(code: string) {
  return createHash("sha256")
    .update(normalizeGiftCardCode(code))
    .digest("hex");
}

export function normalizeGiftCardCode(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export function giftCardSuffix(code: string) {
  const normalized = normalizeGiftCardCode(code);
  return normalized.slice(-4);
}

export function giftCardExpiresAt(years = 2) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return date.toISOString();
}
