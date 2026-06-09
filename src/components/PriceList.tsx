"use client";

import Reveal from "@/components/motion/Reveal";

const PRICES = [
  { name: "BIAB treatment & manicure", price: "€50,-" },
  { name: "BIAB treatment & manicure + gelpolish", price: "€55,-" },
  { name: "Vormcorrectie", price: "€65,-" },
  { name: "Vormcorrectie + gelpolish", price: "€67,50" },
  { name: "Nailextensions & manicure", price: "€70,-" },
  { name: "Nailextensions & manicure + gelpolish", price: "€75,-" },
  { name: "Gelpolish & Russian manicure", price: "€45,-" },
  { name: "Nailart (babyboom, french, chrome etc.)", price: "€7,50" },
  { name: "Correctie eigen nagel", price: "€5" },
  { name: "BIAB verwijderen", price: "€25,-" },
  { name: "Nailextensions verwijderen", price: "€35,-" },
  { name: "Gellak verwijderen", price: "€20" },
];

export default function PriceList() {
  return (
    <section className="fb-pricing" id="prijslijst">
      <div className="fb-container">
        <Reveal className="fb-pricing__header">
          <span className="fb-eyebrow">— Tarieven</span>
          <h2 className="fb-heading">Prijslijst</h2>
          <p className="fb-pricing__lede">
            Transparante tarieven — manicure inbegrepen bij elke behandeling.
          </p>
        </Reveal>
        <ul className="fb-price-list">
          {PRICES.map((item, i) => (
            <Reveal key={item.name} as="li" variant="fade" delay={i * 0.04}>
              <span className="fb-price-list__name">{item.name}</span>
              <span className="fb-price-list__dots" aria-hidden />
              <span className="fb-price-list__price">{item.price}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="fb-pricing__note" variant="fade" delay={0.3}>
          <p>
            Nailart wordt per nagel berekend. Voor vragen over combinaties of
            speciale wensen kun je me altijd bereiken.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
