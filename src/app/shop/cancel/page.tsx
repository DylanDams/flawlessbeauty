import Link from "next/link";

export const metadata = {
  title: "Betaling geannuleerd | Flawless Beauty",
};

export default async function ShopCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="fb-shop-status">
      <section className="fb-shop-status__card">
        <span className="fb-eyebrow">— Cadeaukaart</span>
        <h1 className="fb-heading">Betaling niet afgerond</h1>
        <p className="fb-lede">
          Geen probleem. Je kunt terug naar de website en de cadeaukaart later
          opnieuw bestellen.
        </p>
        {params.order && <p className="fb-shop-status__order">Order: {params.order}</p>}
        <Link href="/#giftcard" className="fb-btn fb-btn--fill">
          Opnieuw proberen
        </Link>
      </section>
    </main>
  );
}
