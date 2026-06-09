import Link from "next/link";

export const metadata = {
  title: "Betaling ontvangen | Flawless Beauty",
};

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="fb-shop-status">
      <section className="fb-shop-status__card">
        <span className="fb-eyebrow">— Cadeaukaart</span>
        <h1 className="fb-heading">Bedankt voor je bestelling</h1>
        <p className="fb-lede">
          Als de betaling door Mollie is bevestigd, wordt de cadeaukaartcode
          automatisch per e-mail verstuurd.
        </p>
        {params.order && <p className="fb-shop-status__order">Order: {params.order}</p>}
        <Link href="/" className="fb-btn fb-btn--fill">
          Terug naar de website
        </Link>
      </section>
    </main>
  );
}
