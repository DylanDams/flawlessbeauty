"use client";

import Reveal from "@/components/motion/Reveal";
import SharpImage from "@/components/SharpImage";

const PRODUCTS = [
  { img: "/img/product-myway-1.jpeg", name: "Gelpolish", featured: true },
  { img: "/img/product-myway-2.jpeg", name: "3-in-1 Hardgel" },
  { img: "/img/product-myway-4.jpeg", name: "Essentials" },
];

export default function Products() {
  return (
    <section className="fb-products" id="producten">
      <div className="fb-container">
        <Reveal>
          <span className="fb-eyebrow">— De producten</span>
          <h2 className="fb-heading">MY WAY</h2>
          <p className="fb-lede">
            Ik werk met MY WAY — kwaliteit, innovatie en perfectie. Als ambassadeur
            kies ik bewust voor deze producten, omdat ze passen bij mijn hoge standaard.
          </p>
          <ul className="fb-products__usps">
            <li>✦ Kwaliteit</li>
            <li>✦ Perfectie</li>
            <li>✦ Professionaliteit</li>
          </ul>
        </Reveal>

        <div className="fb-products__grid">
          {PRODUCTS.map((p, i) => (
            <Reveal
              key={p.name}
              as="figure"
              className={`fb-product${p.featured ? " fb-product--featured" : ""}`}
              variant="scale"
              delay={i * 0.1}
            >
              <SharpImage
                src={p.img}
                alt={`MY WAY ${p.name}`}
                sizes="(max-width: 700px) 100vw, (max-width: 900px) 31vw, 30vw"
              />
              <figcaption>
                <span className="fb-product__tag">MY WAY</span>
                <span className="fb-product__name">{p.name}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
