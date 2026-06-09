"use client";

import Reveal from "@/components/motion/Reveal";

export default function Giftcard() {
  return (
    <section className="fb-giftcard" id="giftcard">
      <Reveal className="fb-giftcard__visual" variant="scale">
        <img src="/img/studio-giftcard.jpeg" alt="Flawless Beauty giftcard" loading="lazy" />
        <span className="fb-giftcard__badge">Giftcard</span>
      </Reveal>
      <Reveal className="fb-giftcard__content" variant="right" delay={0.1}>
        <span className="fb-eyebrow">— Cadeau geven</span>
        <h2 className="fb-heading">Op zoek naar een <em>cadeau?</em></h2>
        <p className="fb-lede">
          Met een giftcard van Flawless Beauty geef je een verwenmoment naar keuze.
        </p>
        <ul className="fb-giftcard__list">
          <li>Zelf kiezen welk bedrag</li>
          <li>Leuk verpakt</li>
          <li>Afhalen of verzonden</li>
        </ul>
        <a
          href="mailto:flawlessbeauty@kpnmail.nl?subject=Giftcard%20bestellen"
          className="fb-btn fb-btn--light"
        >
          Bestel giftcard →
        </a>
      </Reveal>
    </section>
  );
}
