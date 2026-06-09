"use client";

import { useState } from "react";

import { formatMoney } from "@/lib/shop/products";
import type { GiftCardAdminView } from "@/lib/shop/types";

type AdminState = "idle" | "loading" | "error" | "success";

export default function GiftcardAdmin() {
  const [secret, setSecret] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GiftCardAdminView[]>([]);
  const [state, setState] = useState<AdminState>("idle");
  const [message, setMessage] = useState("");

  async function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/giftcards?q=${encodeURIComponent(query)}`,
        { headers: { "x-admin-secret": secret } }
      );
      const body = (await response.json()) as {
        results?: GiftCardAdminView[];
        error?: string;
      };

      if (!response.ok) throw new Error(body.error ?? "Zoeken is mislukt.");

      setResults(body.results ?? []);
      setState("success");
      setMessage((body.results?.length ?? 0) ? "" : "Geen cadeaukaart gevonden.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Zoeken is mislukt.");
    }
  }

  async function redeem(giftCard: GiftCardAdminView, formData: FormData) {
    setState("loading");
    setMessage("");

    const amount = Math.round(Number(String(formData.get("amount") ?? "0").replace(",", ".")) * 100);
    const staffNote = String(formData.get("staffNote") ?? "");

    try {
      const response = await fetch("/api/admin/giftcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          action: "redeem",
          giftCardId: giftCard.id,
          amountCents: amount,
          staffNote,
        }),
      });
      const body = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(body.error ?? "Afboeken is mislukt.");

      setMessage("Cadeaukaart is bijgewerkt.");
      setState("success");
      await refreshResults();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Afboeken is mislukt.");
    }
  }

  async function refreshResults() {
    if (!query) return;
    const response = await fetch(`/api/admin/giftcards?q=${encodeURIComponent(query)}`, {
      headers: { "x-admin-secret": secret },
    });
    const body = (await response.json()) as { results?: GiftCardAdminView[] };
    setResults(body.results ?? []);
  }

  return (
    <main className="fb-admin">
      <section className="fb-admin__panel">
        <span className="fb-eyebrow">— Beheer</span>
        <h1 className="fb-heading">Cadeaukaarten controleren</h1>
        <p className="fb-lede">
          Zoek op volledige code, laatste vier tekens, ordernummer of e-mailadres.
        </p>

        <form className="fb-admin__search" onSubmit={search}>
          <label>
            <span>Admin code</span>
            <input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              required
            />
          </label>
          <label>
            <span>Zoeken</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="FB-ABCD-1234 of e-mail"
              required
            />
          </label>
          <button className="fb-btn fb-btn--fill" disabled={state === "loading"}>
            {state === "loading" ? "Zoeken..." : "Zoeken"}
          </button>
        </form>

        {message && (
          <p className={`fb-admin__message fb-admin__message--${state}`}>{message}</p>
        )}

        <div className="fb-admin__results">
          {results.map((giftCard) => (
            <article key={giftCard.id} className="fb-admin-card">
              <div>
                <span className="fb-admin-card__label">Code eindigt op</span>
                <h2>•••• {giftCard.codeSuffix}</h2>
              </div>
              <dl>
                <div>
                  <dt>Status</dt>
                  <dd>{giftCard.status}</dd>
                </div>
                <div>
                  <dt>Waarde</dt>
                  <dd>{formatMoney(giftCard.initialValueCents)}</dd>
                </div>
                <div>
                  <dt>Resterend</dt>
                  <dd>{formatMoney(giftCard.remainingValueCents)}</dd>
                </div>
                <div>
                  <dt>Klant</dt>
                  <dd>{giftCard.customerName}<br />{giftCard.customerEmail}</dd>
                </div>
                <div>
                  <dt>Ontvanger</dt>
                  <dd>{giftCard.recipientName || "Niet ingevuld"}<br />{giftCard.recipientEmail || ""}</dd>
                </div>
              </dl>

              <form
                action={(formData) => {
                  void redeem(giftCard, formData);
                }}
                className="fb-admin-card__redeem"
              >
                <label>
                  <span>Afboeken bedrag</span>
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    max={giftCard.remainingValueCents / 100}
                    step="0.01"
                    placeholder="Bijv. 25"
                  />
                </label>
                <label>
                  <span>Notitie</span>
                  <input name="staffNote" placeholder="Bijv. BIAB afspraak" />
                </label>
                <button className="fb-btn" disabled={giftCard.remainingValueCents <= 0}>
                  Afboeken
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
