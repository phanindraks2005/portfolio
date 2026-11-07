"use client";

import { m, type Variants } from "framer-motion";

const line: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const word: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/** A heading whose words rise out of a mask, once, as it scrolls into view. */
export function SplitHeading({ text, className, as = "h2", id }: { text: string; className?: string; as?: "h2" | "h3"; id?: string }) {
  const Tag = m[as];
  return (
    <Tag
      id={id}
      className={className}
      variants={line}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {text.split(" ").map((w, i, all) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span className="inline-block" variants={word}>
            {w}
            {i < all.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
