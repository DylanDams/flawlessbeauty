"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#behandelingen", label: "Behandelingen" },
  { href: "#prijslijst", label: "Prijslijst" },
  { href: "#over-mij", label: "Over mij" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fb-nav${scrolled ? " fb-nav--scrolled" : ""}`}>
        <div className="fb-nav__inner fb-nav__pill">
          <span className="fb-nav__spacer" aria-hidden="true" />
          <nav className="fb-nav__links fb-nav__links--left" aria-label="Hoofdnavigatie">
            {LINKS.slice(0, 2).map((l) => (
              <a key={l.href} href={l.href} className="fb-nav__link">{l.label}</a>
            ))}
          </nav>

          <a href="#" className="fb-nav__logo" aria-label="Flawless Beauty home">
            <Image src="/img/logowitklein.svg" alt="" width={1633} height={1229} priority />
          </a>

          <nav className="fb-nav__links fb-nav__links--right">
            {LINKS.slice(2).map((l) => (
              <a key={l.href} href={l.href} className="fb-nav__link">{l.label}</a>
            ))}
          </nav>

          <button
            type="button"
            className="fb-nav__burger"
            aria-label={open ? "Sluit menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ transform: open ? "rotate(45deg) translateY(8px)" : "" }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? "rotate(-45deg) translateY(-8px)" : "" }} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="fb-nav__mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
