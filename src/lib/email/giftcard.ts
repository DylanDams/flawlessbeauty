import { requireEnv } from "@/lib/server/env";
import { formatMoney } from "@/lib/shop/products";
import type { OrderRecord } from "@/lib/shop/types";

type SendGiftCardEmailInput = {
  order: OrderRecord;
  code: string;
};

export async function sendGiftCardEmail({ order, code }: SendGiftCardEmailInput) {
  const to = order.recipient_email || order.customer_email;
  const recipientName = order.recipient_name || order.customer_name;
  const amount = formatMoney(order.total_cents);
  const from = process.env.RESEND_FROM_EMAIL || "Flawless Beauty <cadeaukaart@flawlessbeauty.nl>";
  const salonNotificationEmail = process.env.SALON_NOTIFICATION_EMAIL;

  const payload = {
    from,
    to,
    bcc: salonNotificationEmail ? [salonNotificationEmail] : undefined,
    reply_to: "flawlessbeauty@kpnmail.nl",
    subject: `Jouw Flawless Beauty cadeaukaart van ${amount}`,
    html: renderGiftCardHtml({
      recipientName,
      buyerName: order.customer_name,
      amount,
      code,
      message: order.personal_message,
    }),
    text: renderGiftCardText({
      recipientName,
      buyerName: order.customer_name,
      amount,
      code,
      message: order.personal_message,
    }),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requireEnv("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${text}`);
  }
}

function renderGiftCardHtml(input: {
  recipientName: string;
  buyerName: string;
  amount: string;
  code: string;
  message: string | null;
}) {
  const message = input.message
    ? `<p style="margin:24px 0 0;color:#6b5a4c;font-style:italic;">"${escapeHtml(input.message)}"</p>`
    : "";

  return `
  <div style="margin:0;padding:32px;background:#faf8f6;font-family:Georgia,serif;color:#484036;">
    <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #eadfce;border-radius:18px;overflow:hidden;">
      <div style="padding:42px 36px;background:#484036;color:#dfd9cd;text-align:center;">
        <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;">Flawless Beauty</p>
        <h1 style="margin:0;font-size:42px;font-weight:400;line-height:1;">Cadeaukaart</h1>
      </div>
      <div style="padding:38px 36px;text-align:center;">
        <p style="margin:0 0 18px;font-family:Arial,sans-serif;color:#8a7662;">Voor ${escapeHtml(input.recipientName)}</p>
        <p style="margin:0;font-size:24px;line-height:1.35;">Je hebt een verwenmoment ontvangen van ${escapeHtml(input.buyerName)}.</p>
        ${message}
        <div style="margin:34px auto;padding:24px;border:1px solid #d8c8b4;border-radius:14px;background:#f5efe4;">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a7662;">Waarde</p>
          <p style="margin:0 0 20px;font-size:36px;">${input.amount}</p>
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a7662;">Code</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:26px;letter-spacing:4px;color:#484036;">${input.code}</p>
        </div>
        <p style="margin:0;color:#6b5a4c;line-height:1.7;">Laat deze code zien bij Flawless Beauty. De salon kan de code controleren en afboeken in het systeem.</p>
      </div>
    </div>
  </div>`;
}

function renderGiftCardText(input: {
  recipientName: string;
  buyerName: string;
  amount: string;
  code: string;
  message: string | null;
}) {
  return [
    `Flawless Beauty cadeaukaart`,
    ``,
    `Voor: ${input.recipientName}`,
    `Van: ${input.buyerName}`,
    `Waarde: ${input.amount}`,
    `Code: ${input.code}`,
    input.message ? `Bericht: ${input.message}` : "",
    ``,
    `Laat deze code zien bij Flawless Beauty. De salon kan de code controleren en afboeken in het systeem.`,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
