"use client";

import { useEffect } from "react";

export function useSlideshow(selector: string, intervalMs = 5000) {
  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>(
      `${selector} img`
    );
    if (!images.length) return;

    let currentIndex = 0;
    images[currentIndex].classList.add("active");

    const showNextImage = () => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    };

    const intervalId = window.setInterval(showNextImage, intervalMs);
    return () => window.clearInterval(intervalId);
  }, [selector, intervalMs]);
}
