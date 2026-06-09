"use client";

import Reveal from "@/components/motion/Reveal";

export default function About() {
  return (
    <section className="fb-about" id="over-mij">
      <div className="fb-container fb-about__grid">
        <Reveal className="fb-about__portrait" variant="scale">
          <img src="/img/celine-portrait.jpeg" alt="Celine Dams" loading="lazy" />
        </Reveal>
        <Reveal variant="right">
          <span className="fb-eyebrow">— Over mij</span>
          <h2 className="fb-heading">Hoi, ik ben <em>Celine</em></h2>
          <p className="fb-lede">
            Mijn naam is Celine Dams, en ik ben het gezicht achter Flawless Beauty.
            Ik heb de opleiding tot nagelstyliste succesvol afgerond en ben
            gespecialiseerd in Natural Nail Treatment (BIAB), Upper Forms en
            diverse privétrainingen.
          </p>
          <p className="fb-lede" style={{ marginTop: "1rem" }}>
            Door continu te investeren in mijn kennis kan ik behandelingen
            aanbieden die niet alleen mooi zijn, maar ook zorgvuldig en
            professioneel worden uitgevoerd. Ik werk uitsluitend met hoogwaardige
            producten, waaronder My Way.
          </p>
          <a href="#contact" className="fb-btn" style={{ marginTop: "2rem" }}>
            Neem contact op
          </a>
        </Reveal>
      </div>
    </section>
  );
}
