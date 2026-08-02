"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  splitBy?: "word" | "line";
  delay?: number;
  stagger?: number;
}

/** Revela un titular palabra por palabra, sin rebotes. */
export function RevealText({
  children,
  as = "span",
  className,
  splitBy = "word",
  delay = 0,
  stagger = 0.045,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const units = splitBy === "word" ? children.split(" ") : [children];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag className={cn(className, "inline-block")} aria-label={children}>
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit}
            {splitBy === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
