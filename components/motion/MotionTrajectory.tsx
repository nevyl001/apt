"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

interface MotionTrajectoryProps {
  className?: string;
  color?: string;
  delay?: number;
}

/**
 * Arco abstracto de trayectoria — evocando el movimiento de una pelota en
 * juego, no una copia del arco del logotipo. Se dibuja una sola vez al
 * entrar en viewport.
 */
export function MotionTrajectory({
  className,
  color = "var(--apt-turquoise)",
  delay = 0,
}: MotionTrajectoryProps) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 120"
      fill="none"
      aria-hidden
      className={cn("w-full", className)}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 110 C 150 10, 450 10, 598 110"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
