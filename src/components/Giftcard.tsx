"use client";

import GiftcardShop from "@/components/GiftcardShop";
import Reveal from "@/components/motion/Reveal";
import SharpImage from "@/components/SharpImage";

export default function Giftcard() {
  return (
    <section className="fb-giftcard" id="giftcard">
      <Reveal className="fb-giftcard__visual" variant="scale">
        <SharpImage
          src="/img/studio-giftcard.jpeg"
          alt="Flawless Beauty giftcard"
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <span className="fb-giftcard__badge">Giftcard</span>
      </Reveal>
      <Reveal className="fb-giftcard__content" variant="right" delay={0.1}>
        <span className="fb-eyebrow">— Cadeau geven</span>
        <h2 className="fb-heading">Op zoek naar een <em>cadeau?</em></h2>
        <p className="fb-lede">
          Met een giftcard van Flawless Beauty geef je een verwenmoment naar keuze.
        </p>
        <ul className="fb-giftcard__list">
          <li>Kies zelf het bedrag</li>
          <li>Betaal veilig online</li>
          <li>Ontvang direct een unieke code per e-mail</li>
        </ul>
        <GiftcardShop />
      </Reveal>
    </section>
  );
}
