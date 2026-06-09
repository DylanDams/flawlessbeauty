"use client";

import { useEffect } from "react";

export default function IntroLoader() {
  useEffect(() => {
    const fadeTimeout = window.setTimeout(() => {
      const logo = document.querySelector<HTMLElement>(".intro-logo");
      if (logo) logo.style.opacity = "0";
    }, 1200);

    const swipeTimeout = window.setTimeout(() => {
      document.getElementById("intro")?.classList.add("swipe-out");
    }, 1500);

    return () => {
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(swipeTimeout);
    };
  }, []);

  return (
    <div id="intro" className="intro">
      <img src="/img/logozwart.svg" alt="Logo" className="intro-logo" />
    </div>
  );
}
