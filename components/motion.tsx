"use client";

import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Staggers its direct <RevealItem> children in once, as the block scrolls into view. */
export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "article";
}) {
  const Tag = m[as];
  return (
    <Tag className={className} style={style} variants={item}>
      {children}
    </Tag>
  );
}
