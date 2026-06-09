import Script from "next/script";

export default function SalonizedWidgets() {
  return (
    <>
      <Script
        src="https://cdn.salonized.com/widget.js"
        data-name="salonized"
        data-microsite-url="https://flawless-beauty.salonized.com"
        strategy="afterInteractive"
      />
      <div className="salonized-reviews" />
      <div
        className="salonized-booking"
        data-company="HxLXUtZVNRMMsT1ULcUfB1He"
        data-color="#563d2f"
        data-language="nl"
        data-position="right"
        data-outline="shadow"
      />
      <Script
        src="https://static-widget.salonized.com/loader.js"
        strategy="afterInteractive"
      />
    </>
  );
}
