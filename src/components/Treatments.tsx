"use client";

import { useState } from "react";

import { useSlideshow } from "@/hooks/useSlideshow";

const SLIDESHOW_IMAGES = [
  "nagels1.jpeg",
  "nagels2.jpeg",
  "nagels3.jpeg",
  "nagels4.jpeg",
  "nagels5.jpeg",
  "nagels6.jpeg",
  "nagels7.jpeg",
  "nagels8.jpeg",
  "nagels9.jpeg",
];

export default function Treatments() {
  useSlideshow(".slideshow");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <div id="behandelingen" className="section section-two">
      <div className="section-two-container">
        <div className="content-left">
          <div className="slideshow">
            {SLIDESHOW_IMAGES.map((image) => (
              <img
                key={image}
                src={`/img/${image}`}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>

        <div className="content-right">
          <h2 data-reveal>Behandelingen</h2>

          <div className="treatment-section" data-reveal data-delay="1">
            <h3>
              <button
                type="button"
                className="treatment-title"
                onClick={() => toggle("biab-description")}
                aria-expanded={openId === "biab-description"}
                aria-controls="biab-description"
              >
                BIAB (Natural Nail Treatment)
              </button>
            </h3>
            <p
              id="biab-description"
              className="treatment-description"
              style={{
                display: openId === "biab-description" ? "block" : "none",
              }}
            >
              <img
                src="/img/nagels4.jpeg"
                className="mini-picture-treatment"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <br />
              <strong>BIAB treatment &amp; manicure</strong>
              <br />
              De natuurlijke nagels worden verstevigd met een gel product.
              <br />
              Op de afspraak bekijk ik of ik ga werken met een soft gel (zacht
              product) of een hard gel (hard product), dit is afhankelijk van de
              natuurlijke nagel. <br />
              De nagelriemen worden behandeld doormiddel van een manicure. Deze
              behandeling is ZONDER gelpolish en er wordt gewerkt op de lengte
              van de natuurlijke nagel.
              <br />
              <br />
              <img
                src="/img/nagels3.jpeg"
                className="mini-picture-treatment"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <br />
              <strong>BIAB treatment &amp; manicure + gelpolish</strong>
              <br />
              De natuurlijke nagels worden verstevigd met een gel product.
              <br />
              Op de afspraak bekijk ik of ik ga werken met een soft gel (zacht
              product) of een hard gel (hard product), dit is afhankelijk van de
              natuurlijke nagel. <br />
              De nagelriemen worden behandeld doormiddel van een manicure. Deze
              behandeling is MET gelpolish en er wordt gewerkt op de lengte van
              de natuurlijke nagel.
            </p>
          </div>

          <div className="treatment-section" data-reveal data-delay="2">
            <h3>
              <button
                type="button"
                className="treatment-title"
                onClick={() => toggle("nailextensions-description")}
                aria-expanded={openId === "nailextensions-description"}
                aria-controls="nailextensions-description"
              >
                NAILEXTENSIONS
              </button>
            </h3>
            <p
              id="nailextensions-description"
              className="treatment-description"
              style={{
                display:
                  openId === "nailextensions-description" ? "block" : "none",
              }}
            >
              <img
                src="/img/nagels2.jpeg"
                className="mini-picture-treatment"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <br />
              <strong>Nail extensions &amp; manicure</strong>
              <br />
              De natuurlijke nagels worden verlengd met gel, op de afspraak
              kijk ik of ik met sjablonen ga werken of upperforms, afhankelijk
              van de natuurlijke nagel. Deze behandeling is ZONDER gelpolish.
              <br />
              <br />
              <strong>Nail extensions &amp; manicure + gelpolish</strong>
              <br />
              De natuurlijke nagels worden verlengd met gel, op de afspraak
              kijk ik of ik met sjablonen ga werken of upperforms, afhankelijk
              van de natuurlijke nagel. Deze behandeling is MET gelpolish.
            </p>
          </div>

          <div className="treatment-section" data-reveal data-delay="3">
            <h3>
              <button
                type="button"
                className="treatment-title"
                onClick={() => toggle("gelpolish-description")}
                aria-expanded={openId === "gelpolish-description"}
                aria-controls="gelpolish-description"
              >
                GELPOLISH
              </button>
            </h3>
            <p
              id="gelpolish-description"
              className="treatment-description"
              style={{
                display: openId === "gelpolish-description" ? "block" : "none",
              }}
            >
              <strong>Gelpolish &amp; manicure</strong>
              <br />
              De natuurlijke nagels worden behandeld met een gelpolish en de
              nagelriemen met een manicure. Dit blijft gemiddeld 2-3 weken
              zitten. Wilt u langer genieten van mooie nagels? Kies dan voor een
              BIAB behandeling.
            </p>
          </div>

          <div className="treatment-section" data-reveal data-delay="4">
            <h3>
              <button
                type="button"
                className="treatment-title"
                onClick={() => toggle("nailart-description")}
                aria-expanded={openId === "nailart-description"}
                aria-controls="nailart-description"
              >
                NAILART
              </button>
            </h3>
            <p
              id="nailart-description"
              className="treatment-description"
              style={{
                display: openId === "nailart-description" ? "block" : "none",
              }}
            >
              <img
                src="/img/nagels10.jpeg"
                className="mini-picture-treatment"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <img
                src="/img/nagels1.jpeg"
                className="mini-picture-treatment"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <br />
              Deze behandeling kunt u boeken als extra bij een BIAB,
              Nailextensions of Gelpolish behandeling. Denk aan bijvoorbeeld een
              frenchtip of een babyboom.
            </p>
          </div>

          <div className="treatment-section" data-reveal data-delay="5">
            <h3>
              <button
                type="button"
                className="treatment-title"
                onClick={() => toggle("setverwijderen-description")}
                aria-expanded={openId === "setverwijderen-description"}
                aria-controls="setverwijderen-description"
              >
                SET VERWIJDEREN
              </button>
            </h3>
            <p
              id="setverwijderen-description"
              className="treatment-description"
              style={{
                display:
                  openId === "setverwijderen-description" ? "block" : "none",
              }}
            >
              <strong>BIAB verwijderen</strong>
              <br />
              Hierbij wordt de BIAB op een professionele manier van de nagels
              verwijderd.
              <br />
              <br />
              <strong>Nailextensions verwijderen</strong>
              <br />
              Hierbij worden de Nailextensions op een professionele manier van
              de nagels verwijderd.
              <br />
              <br />
              <strong>Gellak verwijderen</strong>
              <br />
              Hierbij wordt de gellak op een professionele manier van de nagels
              verwijderd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
