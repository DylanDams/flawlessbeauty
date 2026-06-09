const PRICES = [
  { treatment: "BIAB treatment & manicure", price: "€50,-" },
  { treatment: "BIAB treatment & manicure + gelpolish", price: "€55,-" },
  { treatment: "Vormcorrectie", price: "€65,-" },
  { treatment: "Vormcorrectie + gelpolish", price: "€67,50" },
  { treatment: "Nailextensions & manicure", price: "€70,-" },
  { treatment: "Nailextensions & manicure + gelpolish", price: "€75,-" },
  { treatment: "Gelpolish & Russian manicure", price: "€45,-" },
  {
    treatment: "Nailart (babyboom, french manicure, chrome etc.)",
    price: "€7,5,-",
  },
  { treatment: "Correctie eigen nagel", price: "€5" },
  { treatment: "BIAB verwijderen", price: "€25,-" },
  { treatment: "Nailextensions verwijderen", price: "€35,-" },
  { treatment: "Gellak verwijderen", price: "€20" },
];

function MarqueeItem() {
  return (
    <>
      Flawless Beauty <span className="marquee-strip-dot">✦</span> Nagelstudio
      Raalte <span className="marquee-strip-dot">✦</span> MY WAY{" "}
      <span className="marquee-strip-dot">✦</span> BIAB{" "}
      <span className="marquee-strip-dot">✦</span> Nailextensions{" "}
      <span className="marquee-strip-dot">✦</span> Gelpolish{" "}
      <span className="marquee-strip-dot">✦</span> Kwaliteit voorop{" "}
      <span className="marquee-strip-dot">✦</span>
    </>
  );
}

export default function PriceList() {
  return (
    <>
      <div id="prijslijst" className="section section-three">
        <div className="prijslijst-container">
          <div className="prijslijst-left">
            <h2 data-reveal="fade">Prijslijst</h2>
          </div>

          <div className="prijslijst-right" data-reveal data-delay="2">
            <ul className="price-list">
              {PRICES.map((item) => (
                <li key={item.treatment}>
                  <span className="treatment">{item.treatment}</span>
                  <span className="price">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-strip-track">
          <div className="marquee-strip-item">
            <MarqueeItem />
          </div>
          <div className="marquee-strip-item">
            <MarqueeItem />
          </div>
        </div>
      </div>
    </>
  );
}
