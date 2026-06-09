"use client";

import { useEffect, useState } from "react";

export function useSlideshow(imageCount: number, intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageCount <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [imageCount, intervalMs]);

  return currentIndex;
}
