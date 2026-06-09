export default function Giftcard() {
  return (
    <section id="giftcard" className="giftcard-feature">
      <div className="giftcard-inner">
        <div className="giftcard-media">
          <img
            src="/img/studio-giftcard.jpeg"
            alt="Flawless Beauty giftcard"
            data-parallax="0.10"
            loading="lazy"
            decoding="async"
          />
          <span className="giftcard-badge">Giftcard</span>
        </div>
        <div className="giftcard-copy">
          <span className="giftcard-eyebrow">— Cadeau geven</span>
          <h2 className="giftcard-heading">
            Op zoek naar een leuk <br />
            <em>cadeau?</em>
          </h2>
          <p className="giftcard-lede">
            Met een giftcard van Flawless Beauty geef je een verwenmoment naar
            keuze. Perfect voor elke gelegenheid!
          </p>
          <ul className="giftcard-list">
            <li>Zelf kiezen welk bedrag</li>
            <li>Leuk verpakt</li>
            <li>Afhalen of verzonden</li>
          </ul>
          <a
            href="mailto:flawlessbeauty@kpnmail.nl?subject=Giftcard%20bestellen"
            className="giftcard-cta"
          >
            Neem hier contact op
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
