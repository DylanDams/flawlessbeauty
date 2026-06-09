"use client";

import { useMemo, useState } from "react";

import {
  GIFT_CARD_AMOUNTS_CENTS,
  formatMoney,
} from "@/lib/shop/products";

type CheckoutState = "idle" | "loading" | "error";

export default function GiftcardShop() {
  const [amountCents, setAmountCents] = useState(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [state, setState] = useState<CheckoutState>("idle");
  const [error, setError] = useState("");

  const selectedAmount = useMemo(() => {
    if (!customAmount) return amountCents;
    return Math.round(Number(customAmount.replace(",", ".")) * 100);
  }, [amountCents, customAmount]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      productId: "gift-card",
      amountCents: selectedAmount,
      customerName: String(formData.get("customerName") ?? ""),
      customerEmail: String(formData.get("customerEmail") ?? ""),
      recipientName: String(formData.get("recipientName") ?? ""),
      recipientEmail: String(formData.get("recipientEmail") ?? ""),
      personalMessage: String(formData.get("personalMessage") ?? ""),
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error ?? "Betalen starten is niet gelukt.");
      }

      window.location.href = result.checkoutUrl;
    } catch (checkoutError) {
      setState("error");
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Betalen starten is niet gelukt."
      );
    }
  }

  return (
    <form className="fb-giftcard-shop" onSubmit={handleSubmit}>
      <div className="fb-giftcard-shop__amounts" aria-label="Kies bedrag">
        {GIFT_CARD_AMOUNTS_CENTS.map((amount) => (
          <button
            key={amount}
            type="button"
            className={amountCents === amount && !customAmount ? "is-active" : ""}
            onClick={() => {
              setAmountCents(amount);
              setCustomAmount("");
            }}
          >
            {formatMoney(amount)}
          </button>
        ))}
      </div>

      <label className="fb-giftcard-shop__field">
        <span>Of eigen bedrag</span>
        <input
          type="number"
          min="20"
          max="250"
          step="1"
          placeholder="Bijv. 60"
          value={customAmount}
          onChange={(event) => setCustomAmount(event.target.value)}
        />
      </label>

      <div className="fb-giftcard-shop__grid">
        <label className="fb-giftcard-shop__field">
          <span>Jouw naam</span>
          <input name="customerName" required autoComplete="name" />
        </label>
        <label className="fb-giftcard-shop__field">
          <span>Jouw e-mail</span>
          <input name="customerEmail" type="email" required autoComplete="email" />
        </label>
        <label className="fb-giftcard-shop__field">
          <span>Naam ontvanger</span>
          <input name="recipientName" autoComplete="off" />
        </label>
        <label className="fb-giftcard-shop__field">
          <span>E-mail ontvanger</span>
          <input
            name="recipientEmail"
            type="email"
            placeholder="Leeg laten = naar jou"
            autoComplete="off"
          />
        </label>
      </div>

      <label className="fb-giftcard-shop__field">
        <span>Persoonlijk bericht</span>
        <textarea
          name="personalMessage"
          rows={3}
          maxLength={400}
          placeholder="Optioneel bericht voor op de cadeaukaart"
        />
      </label>

      <div className="fb-giftcard-shop__footer">
        <p>Totaal: <strong>{formatMoney(selectedAmount || 0)}</strong></p>
        <button className="fb-btn fb-btn--light fb-btn--light-fill" disabled={state === "loading"}>
          {state === "loading" ? "Doorsturen..." : "Veilig betalen"}
        </button>
      </div>

      {state === "error" && <p className="fb-giftcard-shop__error">{error}</p>}
    </form>
  );
}
