"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

import Reveal from "@/components/motion/Reveal";
import SharpImage from "@/components/SharpImage";

type TreatmentPrice = { name: string; price: string };

type Treatment = {
  id: string;
  cardTitle: string;
  title: string;
  image: string;
  tagline: string;
  prices: TreatmentPrice[];
  body: ReactNode;
};

const TREATMENTS: Treatment[] = [
  {
    id: "biab",
    cardTitle: "BIAB",
    title: "BIAB — Natural Nail Treatment",
    image: "/img/nagels4.jpeg",
    tagline: "Versterk en verzorg je natuurlijke nagels",
    prices: [
      { name: "BIAB treatment & manicure", price: "€50,-" },
      { name: "BIAB + gelpolish", price: "€55,-" },
      { name: "Vormcorrectie", price: "€65,-" },
      { name: "Vormcorrectie + gelpolish", price: "€67,50" },
    ],
    body: (
      <>
        <p>
          De natuurlijke nagels worden verstevigd met een gel product. Op de
          afspraak bekijk ik of ik ga werken met een soft gel of een hard gel.
          De nagelriemen worden behandeld doormiddel van een manicure.
        </p>
        <ul className="fb-treat-detail__list">
          <li>
            <strong>BIAB treatment &amp; manicure</strong> — versteviging ZONDER
            gelpolish
          </li>
          <li>
            <strong>BIAB + gelpolish</strong> — zelfde behandeling MET gelpolish
            op de lengte van de natuurlijke nagel
          </li>
          <li>
            <strong>Vormcorrectie</strong> — corrigeren van de nagelvorm met BIAB
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "extensions",
    cardTitle: "Nailextensions",
    title: "Nailextensions",
    image: "/img/nagels2.jpeg",
    tagline: "Lengte en vorm met precisie",
    prices: [
      { name: "Extensions & manicure", price: "€70,-" },
      { name: "Extensions + gelpolish", price: "€75,-" },
    ],
    body: (
      <>
        <p>
          Met nailextensions creëer ik de lengte en vorm die bij jou past —
          altijd met aandacht voor de gezondheid van je natuurlijke nagel.
        </p>
        <ul className="fb-treat-detail__list">
          <li>
            <strong>Nail extensions &amp; manicure</strong> — verlenging met gel,
            ZONDER gelpolish
          </li>
          <li>
            <strong>Nail extensions + gelpolish</strong> — MET gelpolish
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gelpolish",
    cardTitle: "Gelpolish",
    title: "Gelpolish & Russian manicure",
    image: "/img/nagels5.jpeg",
    tagline: "Kleur die wekenlang perfect blijft",
    prices: [{ name: "Gelpolish & Russian manicure", price: "€45,-" }],
    body: (
      <p>
        De natuurlijke nagels worden behandeld met gelpolish en de nagelriemen
        met een manicure. Gemiddeld blijft het resultaat 2–3 weken mooi zitten —
        met de verzorging die je nagels verdienen.
      </p>
    ),
  },
  {
    id: "nailart",
    cardTitle: "Nailart",
    title: "Nailart",
    image: "/img/nagels10.jpeg",
    tagline: "French, babyboom, chrome & meer",
    prices: [{ name: "Per nagel (babyboom, french, chrome etc.)", price: "€7,50" }],
    body: (
      <>
        <p>
          Nailart is het finishing touch — subtiel of opvallend, helemaal naar
          jouw wens. Denk aan frenchtip, babyboom, chrome of andere details.
        </p>
        <p className="fb-treat-detail__note">
          Toe te voegen bij BIAB, nailextensions of gelpolish.
        </p>
      </>
    ),
  },
  {
    id: "removal",
    cardTitle: "Verwijderen",
    title: "Set verwijderen",
    image: "/img/nagels6.jpeg",
    tagline: "Veilig en zorgvuldig verwijderd",
    prices: [
      { name: "BIAB verwijderen", price: "€25,-" },
      { name: "Nailextensions verwijderen", price: "€35,-" },
      { name: "Gellak verwijderen", price: "€20" },
    ],
    body: (
      <p>
        Een set verwijderen doe ik altijd zorgvuldig, zodat je natuurlijke nagels
        zo gezond mogelijk blijven. Kies de behandeling die past bij wat je
        draagt.
      </p>
    ),
  },
];

export default function Treatments() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = TREATMENTS.find((t) => t.id === activeId);

  return (
    <section className="fb-treatments" id="behandelingen">
      <div className="fb-container">
        <Reveal className="fb-treatments__header">
          <span className="fb-eyebrow">— Behandelingen</span>
          <h2 className="fb-heading">Wat ik <em>aanbied</em></h2>
          <p className="fb-lede fb-treatments__lede">
            Kies een behandeling om meer te lezen — van BIAB tot nailart, altijd
            met persoonlijke aandacht.
          </p>
        </Reveal>

        <div className="fb-treat-cards">
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <button
                type="button"
                className={`fb-treat-card${activeId === t.id ? " is-active" : ""}`}
                onClick={() => {
                  const next = activeId === t.id ? null : t.id;
                  setActiveId(next);
                  if (next) {
                    requestAnimationFrame(() => {
                      document.querySelector(".fb-treat-detail")?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    });
                  }
                }}
                aria-expanded={activeId === t.id}
              >
                <SharpImage
                  src={t.image}
                  alt=""
                  sizes="(max-width: 900px) 46vw, 30vw"
                />
                <div className="fb-treat-card__overlay" aria-hidden />
                <div className="fb-treat-card__content">
                  <span className="fb-treat-card__title">{t.cardTitle}</span>
                  <span className="fb-treat-card__cta">
                    {activeId === t.id ? "Sluiten" : "Ontdek"}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <a href="#contact" className="fb-treat-card fb-treat-card--cta">
              <div className="fb-treat-card__content">
                <span className="fb-treat-card__title">
                  Boek eenvoudig jouw afspraak
                </span>
                <span className="fb-treat-card__cta fb-treat-card__cta--fill">
                  Maak afspraak
                </span>
              </div>
            </a>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              className="fb-treat-detail"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                className="fb-treat-detail__back"
                onClick={() => setActiveId(null)}
              >
                ← Alle behandelingen
              </button>

              <div className="fb-treat-detail__grid">
                <div className="fb-treat-detail__main">
                  <h3 className="fb-treat-detail__title">{active.title}</h3>
                  <p className="fb-treat-detail__tagline">{active.tagline}</p>
                  <div className="fb-treat-detail__body">{active.body}</div>
                  <a href="#prijslijst" className="fb-btn" style={{ marginTop: "1.5rem" }}>
                    Volledige prijslijst
                  </a>
                </div>

                <aside className="fb-treat-detail__aside">
                  <div className="fb-treat-detail__pricebox">
                    <span className="fb-treat-detail__pricebox-label">Tarieven</span>
                    <ul>
                      {active.prices.map((p) => (
                        <li key={p.name}>
                          <span>{p.name}</span>
                          <span className="fb-treat-detail__price">{p.price}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="fb-btn fb-btn--light fb-btn--fill">
                      Afspraak maken
                    </a>
                  </div>
                  <div className="fb-treat-detail__photo">
                    <SharpImage
                      src={active.image}
                      alt=""
                      sizes="(max-width: 900px) 100vw, 30vw"
                    />
                  </div>
                </aside>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
