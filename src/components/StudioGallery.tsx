export default function StudioGallery() {
  return (
    <section id="galerij" className="studio-feature">
      <div className="studio-feature-inner">
        <div className="studio-intro" data-reveal>
          <span className="studio-eyebrow">— Flawless Beauty</span>
          <h2 className="studio-heading">
            Welkom in
            <br />
            <em>mijn</em> salon
          </h2>
          <p className="studio-lede">
            Mijn salon zit in Raalte, een rustige plek waar het draait om meer
            dan nagels: persoonlijke aandacht, precisie en topkwaliteit. Ik
            investeer ieder jaar in diverse trainingen waardoor ik mijn klanten
            de beste kwaliteit kan bieden.
          </p>
        </div>

        <div className="studio-mosaic">
          <figure className="studio-tile studio-tile--hero">
            <img
              src="/img/werksfeer-celine.jpeg"
              alt="Celine aan het werk"
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Aan het werk</figcaption>
          </figure>

          <figure className="studio-tile studio-tile--tall">
            <img
              src="/img/studio-bank.jpeg"
              alt="Studio interieur"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Warm ontvangst</figcaption>
          </figure>

          <figure className="studio-tile studio-tile--wide">
            <img
              src="/img/werksfeer-vijlen.jpeg"
              alt="Nagels vijlen"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Afwerking</figcaption>
          </figure>

          <div className="studio-quote">
            <span className="studio-quote-mark">“</span>
            <p>
              Wat ik het mooiste vind aan mijn werk, is het moment waarop
              iemand weer blij en zelfverzekerd de deur uitgaat.
            </p>
            <span className="studio-quote-author">
              — <span className="signature">Celine</span>
            </span>
          </div>

          <figure className="studio-tile studio-tile--square">
            <img
              src="/img/werksfeer-kleuren.jpeg"
              alt="Kleur kiezen"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Kleurkeuze</figcaption>
          </figure>

          <figure className="studio-tile studio-tile--square">
            <img
              src="/img/werksfeer-gel.jpeg"
              alt="Gel aanbrengen"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Verzorging</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
