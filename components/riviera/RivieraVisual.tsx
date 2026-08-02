"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

const CITIES = [
  { x: 70, y: 60, label: "CDMX" },
  { x: 400, y: 90, label: "Cancún" },
  { x: 60, y: 300, label: "Guadalajara" },
  { x: 420, y: 320, label: "Mérida" },
];

/**
 * Una sola escena que evoluciona con `stage` (0–3): partido → resultado →
 * ranking → conexión nacional. No son cuatro ilustraciones distintas, son
 * capas que se acumulan sobre la misma cancha — Motion resuelve el cruce.
 */
export function RivieraVisual({ stage }: { stage: number }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-deep">
      <div className="apt-grain" />

      <svg
        aria-hidden
        viewBox="0 0 480 380"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <polygon
          points="90,300 390,300 350,90 130,90"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1.4}
        />
        <line x1="240" y1="90" x2="240" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1="118" y1="195" x2="362" y2="195" stroke="var(--apt-turquoise)" strokeOpacity={0.45} strokeWidth={1.5} />

        <circle cx="200" cy="150" r="6" fill="var(--apt-white)" fillOpacity={0.85} />
        <circle cx="280" cy="240" r="6" fill="var(--apt-white)" fillOpacity={0.85} />
        <motion.circle
          cx="240"
          cy="195"
          r="7"
          fill="var(--apt-lime)"
          animate={reduced ? undefined : { cy: [195, 160, 195, 230, 195] }}
          transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <AnimatePresence>
          {stage >= 3 &&
            CITIES.map((c) => (
              <motion.g
                key={c.label}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={reduced ? undefined : { opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <line
                  x1="240"
                  y1="195"
                  x2={c.x}
                  y2={c.y}
                  stroke="var(--apt-turquoise)"
                  strokeOpacity={0.3}
                  strokeWidth={1}
                  strokeDasharray="2 5"
                />
                <circle cx={c.x} cy={c.y} r="4" fill="var(--apt-turquoise)" />
              </motion.g>
            ))}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        {stage >= 3 &&
          CITIES.map((c) => (
            <motion.span
              key={c.label}
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.12em] text-white/45"
              style={{ left: `${(c.x / 480) * 100}%`, top: `${(c.y / 380) * 100}%` }}
            >
              {c.label}
            </motion.span>
          ))}
      </AnimatePresence>

      <div className="absolute left-6 top-6 flex flex-col gap-2 sm:left-8 sm:top-8">
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={reduced ? undefined : { opacity: 0, x: -12 }}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: EASE_SECONDARY }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-lime" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                Resultado
              </span>
              <span className="text-[10px] text-white/45">6-4 · 6-3</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={reduced ? undefined : { opacity: 0, x: -12 }}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: EASE_SECONDARY }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-turquoise" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                Ranking
              </span>
              <span className="text-[10px] text-white/45">↑ Nº 12</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          Riviera App
        </p>
        <AnimatePresence>
          {stage >= 3 && (
            <motion.p
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-xs font-bold uppercase tracking-[0.16em] text-turquoise"
            >
              Riviera Open
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
