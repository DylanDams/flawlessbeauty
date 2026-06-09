"use client";

import Reveal from "@/components/motion/Reveal";

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
            <img src="/img/werksfeer-vijlen.jpeg" alt="Handgemaakte nagels" loading="lazy" />
          </Reveal>
          <Reveal className="fb-intro__img fb-intro__img--offset" variant="scale" delay={0.2}>
            <img src="/img/werksfeer-celine.jpeg" alt="Celine aan het werk" loading="lazy" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
