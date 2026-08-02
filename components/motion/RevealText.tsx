"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";
import { DURATION, EASE_SECONDARY, STAGGER } from "@/lib/motion/tokens";

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
  stagger = STAGGER.min,
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
          className={cn(
            "inline-block overflow-hidden align-bottom",
            // El espacio entre palabras se hace con margen, no con un
            // carácter " " al final del inline-block: un espacio de texto
            // ahí queda dentro del contexto de línea propio del
            // inline-block y el navegador lo recorta (colapso de espacios
            // en blanco al final de línea), desapareciendo visualmente en
            // cuanto el título ocupa más de una línea.
            splitBy === "word" && i < units.length - 1 && "mr-[0.28em]",
          )}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: DURATION.reveal,
              delay: delay + i * stagger,
              ease: EASE_SECONDARY,
            }}
          >
            {unit}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
