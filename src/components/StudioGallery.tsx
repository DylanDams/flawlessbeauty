"use client";

import Reveal from "@/components/motion/Reveal";
import SharpImage from "@/components/SharpImage";

const GALLERY = [
  { src: "/img/werksfeer-celine.jpeg", alt: "Celine aan het werk", caption: "Aan het werk", wide: true },
  { src: "/img/studio-bank.jpeg", alt: "Studio interieur", caption: "Warm ontvangst" },
  { src: "/img/werksfeer-vijlen.jpeg", alt: "Nagels vijlen", caption: "Afwerking" },
  { src: "/img/werksfeer-kleuren.jpeg", alt: "Kleur kiezen", caption: "Kleurkeuze" },
  { src: "/img/werksfeer-gel.jpeg", alt: "Gel aanbrengen", caption: "Verzorging" },
];

export default function StudioGallery() {
  return (
    <section className="fb-studio" id="galerij">
      <div className="fb-container">
        <Reveal className="fb-studio__header">
          <span className="fb-eyebrow">— De salon</span>
          <h2 className="fb-heading">Welkom in <em>mijn</em> atelier</h2>
          <p className="fb-lede">
            Een rustige plek in Raalte waar het draait om persoonlijke aandacht,
            precisie en topkwaliteit.
          </p>
        </Reveal>

        <p className="fb-studio__hint" aria-hidden="true">
          ← Swipe om meer te zien →
        </p>
      </div>

      <div className="fb-studio__scroll-wrap">
        <div className="fb-studio__scroll">
          {GALLERY.map((item) => (
            <figure
              key={item.src}
              className={`fb-studio__card${item.wide ? " fb-studio__card--wide" : ""}`}
            >
              <SharpImage
                src={item.src}
                alt={item.alt}
                sizes={item.wide ? "(max-width: 900px) 85vw, 480px" : "(max-width: 900px) 78vw, 340px"}
              />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="fb-container">
        <Reveal className="fb-studio__quote" delay={0.15}>
          <p>
            Wat ik het mooiste vind aan mijn werk, is het moment waarop iemand
            weer blij en zelfverzekerd de deur uitgaat.
          </p>
          <cite>— Celine</cite>
        </Reveal>
      </div>
    </section>
  );
}
