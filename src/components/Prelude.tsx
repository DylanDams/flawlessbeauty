"use client";

import Reveal from "@/components/motion/Reveal";
import SharpImage from "@/components/SharpImage";

export default function Prelude() {
  return (
    <section className="fb-intro">
      <div className="fb-container fb-intro__grid">
        <Reveal variant="left">
          <span className="fb-eyebrow">— Welkom</span>
          <p className="fb-intro__quote">
            Nagels met <em>aandacht</em> voor elk detail
          </p>
          <p className="fb-lede" style={{ marginTop: "1.5rem" }}>
            Bij Flawless Beauty draait alles om precisie, persoonlijke aandacht
            en de hoogste kwaliteit — van BIAB tot nailart.
          </p>
          <ul className="fb-intro__trust">
            <li>BIAB specialist</li>
            <li>MY WAY ambassadeur</li>
            <li>Persoonlijke aandacht</li>
          </ul>
        </Reveal>

        <div className="fb-intro__images">
          <Reveal className="fb-intro__img" variant="scale" delay={0.1}>
            <SharpImage
              src="/img/werksfeer-vijlen.jpeg"
              alt="Handgemaakte nagels"
              sizes="(max-width: 900px) 46vw, 22vw"
              priority
            />
          </Reveal>
          <Reveal className="fb-intro__img fb-intro__img--offset" variant="scale" delay={0.2}>
            <SharpImage
              src="/img/werksfeer-celine.jpeg"
              alt="Celine aan het werk"
              sizes="(max-width: 900px) 46vw, 22vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
