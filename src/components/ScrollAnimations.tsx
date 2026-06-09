"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");

    if (!reduce && dot && ring && window.matchMedia("(hover: hover)").matches) {
      let mouseX = 0;
      let mouseY = 0;
      let ringX = 0;
      let ringY = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      };

      const onMouseLeave = () => ring.classList.add("is-hidden");
      const onMouseEnter = () => ring.classList.remove("is-hidden");

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseenter", onMouseEnter);

      const hoverSel =
        "a, button, .treatment-title, .sg-dot, .contact-button, .hamburger-menu";
      const hoverEls = document.querySelectorAll(hoverSel);
      const enterHandlers = new Map<Element, () => void>();
      const leaveHandlers = new Map<Element, () => void>();

      hoverEls.forEach((el) => {
        const onEnter = () => ring.classList.add("is-hovering");
        const onLeave = () => ring.classList.remove("is-hovering");
        enterHandlers.set(el, onEnter);
        leaveHandlers.set(el, onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      let frameId = 0;
      const followRing = () => {
        ringX += (mouseX - ringX) * 0.11;
        ringY += (mouseY - ringY) * 0.11;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        frameId = requestAnimationFrame(followRing);
      };
      frameId = requestAnimationFrame(followRing);

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseenter", onMouseEnter);
        hoverEls.forEach((el) => {
          const onEnter = enterHandlers.get(el);
          const onLeave = leaveHandlers.get(el);
          if (onEnter) el.removeEventListener("mouseenter", onEnter);
          if (onLeave) el.removeEventListener("mouseleave", onLeave);
        });
        cancelAnimationFrame(frameId);
      });
    }

    const revealEls = document.querySelectorAll("[data-reveal]");
    let revealObserver: IntersectionObserver | undefined;

    if (revealEls.length) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      revealEls.forEach((el) => revealObserver?.observe(el));
      cleanups.push(() => revealObserver?.disconnect());
    }

    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");

    if (
      !reduce &&
      parallaxEls.length &&
      !window.matchMedia("(max-width: 640px)").matches
    ) {
      let ticking = false;
      const strengthFor = (el: HTMLElement) =>
        parseFloat(el.dataset.parallax || "") || 0.15;

      parallaxEls.forEach((el) => {
        el.style.transition = "none";
        el.style.willChange = "transform";
      });

      const updateParallax = () => {
        const vh = window.innerHeight;
        parallaxEls.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          const mid = rect.top + rect.height / 2;
          const offset = (mid - vh / 2) * strengthFor(el) * -1;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
        });
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };

      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    const scrollIndicator = document.querySelector<HTMLElement>(
      ".scroll-indicator"
    );
    const hideIndicator = () => {
      if (window.scrollY > 80 && scrollIndicator) {
        scrollIndicator.style.opacity = "0";
        window.removeEventListener("scroll", hideIndicator);
      }
    };

    if (scrollIndicator) {
      window.addEventListener("scroll", hideIndicator, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", hideIndicator);
      });
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
