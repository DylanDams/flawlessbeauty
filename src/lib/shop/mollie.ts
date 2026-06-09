import { getBaseUrl, requireEnv } from "@/lib/server/env";

type MolliePayment = {
  id: string;
  status: string;
  metadata?: {
    orderId?: string;
  };
  _links?: {
    checkout?: {
      href: string;
    };
  };
};

type CreateMolliePaymentInput = {
  orderId: string;
  amountCents: number;
  customerEmail: string;
};

export async function createMolliePayment(input: CreateMolliePaymentInput) {
  const baseUrl = getBaseUrl();
  const payment = await mollieRequest<MolliePayment>("/v2/payments", {
    method: "POST",
    body: {
      amount: {
        currency: "EUR",
        value: toMollieAmount(input.amountCents),
      },
      description: `Flawless Beauty cadeaukaart ${input.orderId.slice(0, 8)}`,
      redirectUrl: `${baseUrl}/shop/success?order=${input.orderId}`,
      cancelUrl: `${baseUrl}/shop/cancel?order=${input.orderId}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: {
        orderId: input.orderId,
        customerEmail: input.customerEmail,
      },
      locale: "nl_NL",
    },
  });

  const checkoutUrl = payment._links?.checkout?.href;
  if (!checkoutUrl) {
    throw new Error("Mollie did not return a checkout URL.");
  }

  return {
    paymentId: payment.id,
    checkoutUrl,
  };
}

export async function getMolliePayment(paymentId: string) {
  return mollieRequest<MolliePayment>(`/v2/payments/${encodeURIComponent(paymentId)}`);
}

function toMollieAmount(cents: number) {
  return (cents / 100).toFixed(2);
}

async function mollieRequest<T>(
  path: string,
  options: { method?: "GET" | "POST"; body?: unknown } = {}
) {
  const response = await fetch(`https://api.mollie.com${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${requireEnv("MOLLIE_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mollie request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as T;
}
