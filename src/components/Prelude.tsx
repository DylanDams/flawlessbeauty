export default function Prelude() {
  return (
    <section className="prelude">
      <div className="prelude-inner">
        <div className="prelude-top">
          <span className="prelude-line" aria-hidden="true" />
          <span className="prelude-eyebrow" data-reveal>
            — Nagelstudio · Raalte{" "}
          </span>
          <span className="prelude-line" aria-hidden="true" />
        </div>

        <div className="prelude-strip">
          <figure className="prelude-tile prelude-tile--1">
            <img
              src="/img/werksfeer-vijlen.jpeg"
              alt="Handgemaakte nagels"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="prelude-word" data-reveal>
            <span className="prelude-word-top">met</span>
            <span className="prelude-word-big">aandacht</span>
            <span className="prelude-word-bot">voor elk detail</span>
          </div>

          <figure className="prelude-tile prelude-tile--2">
            <img
              src="/img/werksfeer-celine.jpeg"
              alt="Celine aan het werk"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className="prelude-tile prelude-tile--3">
            <img
              src="/img/product-myway-1.jpeg"
              alt="MY WAY producten"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
