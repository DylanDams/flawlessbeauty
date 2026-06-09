"use client";

import { useEffect } from "react";

/** Custom cursor only — section animations handled by Framer Motion Reveal */
export default function ScrollAnimations() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring || !window.matchMedia("(hover: hover)").matches) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let frameId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    document.addEventListener("mousemove", onMove);

    const hoverSel = "a, button, .fb-treat-card, .fb-btn, .fb-nav__burger";
    const els = document.querySelectorAll(hoverSel);
    const handlers: Array<{ el: Element; enter: () => void; leave: () => void }> = [];

    els.forEach((el) => {
      const enter = () => ring.classList.add("is-hovering");
      const leave = () => ring.classList.remove("is-hovering");
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      handlers.push({ el, enter, leave });
    });

    const follow = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frameId = requestAnimationFrame(follow);
    };
    frameId = requestAnimationFrame(follow);

    return () => {
      document.removeEventListener("mousemove", onMove);
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
