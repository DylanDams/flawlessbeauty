"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="menu-left">
            <a href="#behandelingen">Behandelingen</a>
            <a href="#prijslijst">Prijslijst</a>
          </div>
          <div className="logo">
            <img
              src="/img/logowitklein.svg"
              alt="Flawless Beauty"
              className="logo-img"
            />
          </div>
          <div className="menu-right">
            <a href="#over-mij">Over mij</a>
            <a href="#contact">Contact</a>
          </div>
          <button
            type="button"
            className="hamburger-menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>
      <div
        id="navbar-mobile"
        className="navbar-mobile"
        style={{ display: menuOpen ? "block" : "none" }}
      >
        <a href="#behandelingen" onClick={closeMenu}>
          Behandelingen
        </a>
        <a href="#prijslijst" onClick={closeMenu}>
          Prijslijst
        </a>
        <a href="#over-mij" onClick={closeMenu}>
          Over mij
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </div>
    </>
  );
}
