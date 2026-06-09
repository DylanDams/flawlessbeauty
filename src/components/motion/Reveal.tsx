"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

type RevealVariant = "up" | "fade" | "left" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "figure" | "li" | "span";
};

function buildVariants(isMobile: boolean): Record<RevealVariant, Variants> {
  const shift = isMobile ? 20 : 48;
  const blur = isMobile ? 4 : 8;

  return {
    up: {
      hidden: { opacity: 0, y: shift, filter: `blur(${blur}px)` },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    left: {
      hidden: { opacity: 0, x: -shift, filter: `blur(${blur - 2}px)` },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    right: {
      hidden: { opacity: 0, x: shift, filter: `blur(${blur - 2}px)` },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    scale: {
      hidden: { opacity: 0, scale: isMobile ? 0.97 : 0.94, filter: `blur(${blur - 4}px)` },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  };
}

export default function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 0.9,
  once = true,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const variants = buildVariants(isMobile);
  const Component = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
