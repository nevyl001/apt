"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

const ACCENTS = ["var(--apt-turquoise)", "var(--apt-lime)", "var(--apt-white)"];

interface FormatsVisualProps {
  index: number;
  number: string;
  name: string;
}

/**
 * Cancha abstracta única cuyo acento y etiqueta cambian según el formato
 * activo de la lista — no siete tarjetas repetidas, una sola composición
 * que reacciona.
 */
export function FormatsVisual({ index, number, name }: FormatsVisualProps) {
  const reduced = useReducedMotion();
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep">
      <div className="apt-grain" />

      <svg
        aria-hidden
        viewBox="0 0 480 380"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <polygon
          points="60,320 420,320 370,60 110,60"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={1.4}
        />
        <line x1="240" y1="60" x2="240" y2="320" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line
          x1="88"
          y1="190"
          x2="392"
          y2="190"
          stroke={accent}
          strokeOpacity={0.5}
          strokeWidth={2}
          style={{ transition: "stroke 0.4s ease" }}
        />

        <AnimatePresence mode="wait">
          <motion.circle
            key={index}
            cx="240"
            cy="190"
            r="10"
            fill={accent}
            initial={reduced ? undefined : { opacity: 0, scale: 0.4 }}
            animate={reduced ? undefined : { opacity: 0.9, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_SECONDARY }}
          />
        </AnimatePresence>
      </svg>

      <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={reduced ? undefined : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_SECONDARY }}
            className="font-display block text-[7rem] font-bold leading-none text-white/10 sm:text-[9rem]"
          >
            {number}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          Formato activo
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={reduced ? undefined : { opacity: 0, y: 6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE_SECONDARY }}
            className="font-display mt-1 text-2xl font-bold uppercase text-white sm:text-3xl"
          >
            {name}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
