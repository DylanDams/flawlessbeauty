"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const baseDelay = reduceMotion ? 0 : isMobile ? 0.3 : 2.2;

  return (
    <section className="fb-hero" id="home">
      <div className="fb-hero__media">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="background-video video-pc"
        >
          <source src="/img/flawlessbeauty.webm" type="video/webm" />
        </video>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="background-video video-mobile"
        >
          <source src="/img/flawlessbeauty-vertical.webm" type="video/webm" />
        </video>
        <div className="fb-hero__overlay" />
      </div>

      <div className="fb-hero__content">
        <motion.p
          className="fb-hero__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.7 }}
        >
          Nagelstudio · Raalte
        </motion.p>
        <motion.h1
          className="fb-hero__title"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          Flawless
          <br />
          Beauty
        </motion.h1>
        <motion.div
          className="fb-hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.35, duration: 0.7 }}
        >
          <a href="#behandelingen" className="fb-btn fb-btn--light">
            Behandelingen
          </a>
          <a href="#contact" className="fb-btn fb-btn--light fb-btn--light-fill">
            Afspraak maken
          </a>
        </motion.div>
      </div>

    </section>
  );
}
