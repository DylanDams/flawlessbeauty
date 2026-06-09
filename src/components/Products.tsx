export default function Products() {
  return (
    <section id="producten" className="products-feature">
      <div className="products-feature-inner">
        <div className="products-copy" data-reveal="left">
          <span className="products-eyebrow">— De producten</span>
          <h2 className="products-heading">
            MY WAY
            <br />
          </h2>
          <p className="products-lede">
            Ik werk met MY WAY, een merk dat staat voor kwaliteit, innovatie en
            perfectie. Als ambassadeur kies ik bewust voor deze producten,
            omdat ze passen bij mijn hoge standaard. Zo kan ik jou sterke,
            verzorgde nagels bieden die lang mooi blijven.
          </p>
          <ul className="products-usp">
            <li>
              <span>✦</span> Kwaliteit
            </li>
            <li>
              <span>✦</span> Perfectie
            </li>
            <li>
              <span>✦</span> Professionaliteit{" "}
            </li>
          </ul>
        </div>

        <div className="products-grid">
          <figure className="product-card product-card--accent">
            <img
              src="/img/product-myway-1.jpeg"
              alt="MY WAY gelpolish"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="product-tag">MY WAY</span>
              <span className="product-name">Gelpolish</span>
            </figcaption>
          </figure>
          <figure className="product-card">
            <img
              src="/img/product-myway-2.jpeg"
              alt="MY WAY collectie"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="product-tag">MY WAY</span>
              <span className="product-name">3 - 1 Hardgel</span>
            </figcaption>
          </figure>
          <figure className="product-card">
            <img
              src="/img/product-myway-4.jpeg"
              alt="MY WAY palette"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="product-tag">MY WAY</span>
              <span className="product-name">Essentials</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
