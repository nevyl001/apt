"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { rivieraOpen } from "@/lib/data/links";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

const PLAYERS = [
  { x: 200, y: 150 },
  { x: 280, y: 240 },
  { x: 160, y: 260 },
];

/** Red nacional abstracta — sin ciudades reales, solo nodos genéricos. */
const NETWORK_NODES = [
  { x: 90, y: 70 },
  { x: 410, y: 90 },
  { x: 70, y: 310 },
  { x: 420, y: 320 },
];

const ORIGIN = { x: 240, y: 195 };

/**
 * Instantánea estática de una etapa (0–3), usada en móvil/tablet donde no
 * hay pin de scroll: la misma cancha, mismos nodos, misma pelota — cada
 * etapa suma una capa de información sobre la anterior.
 */
export function RivieraVisual({ stage }: { stage: number }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-deep">
      <div className="apt-grain" />

      <span
        aria-hidden
        className="font-display pointer-events-none absolute -right-2 -top-6 select-none text-[6.5rem] font-bold leading-none text-white/[0.06] sm:text-[8.5rem]"
      >
        {String(stage + 1).padStart(2, "0")}
      </span>

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

        {/* Etapa 1: trayectoria de juego punteada. Etapa 2+: línea de registro sólida. */}
        <line
          x1="118"
          y1="195"
          x2="362"
          y2="195"
          stroke="var(--apt-turquoise)"
          strokeWidth={stage >= 1 ? 2.5 : 1.5}
          strokeOpacity={stage >= 1 ? 0.7 : 0.4}
          strokeDasharray={stage >= 1 ? "0" : "3 6"}
        />

        {PLAYERS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6" fill="var(--apt-white)" fillOpacity={0.85} />
        ))}
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="7" fill="var(--apt-lime)" />

        {/* Etapa 3: mini tabla de ranking — tres posiciones, una sube. */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.g
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {[0, 1, 2].map((row) => (
                <rect
                  key={row}
                  x={70}
                  y={230 + row * 16}
                  width={row === 1 ? 90 : 70}
                  height={8}
                  rx={4}
                  fill={row === 1 ? "var(--apt-lime)" : "rgba(255,255,255,0.18)"}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Etapa 4: red nacional abstracta — nodos genéricos, sin ciudades reales. */}
        <AnimatePresence>
          {stage >= 3 &&
            NETWORK_NODES.map((n, i) => (
              <motion.g
                key={i}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={reduced ? undefined : { opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <line
                  x1={ORIGIN.x}
                  y1={ORIGIN.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="var(--apt-turquoise)"
                  strokeOpacity={0.3}
                  strokeWidth={1}
                  strokeDasharray="2 5"
                />
                <circle cx={n.x} cy={n.y} r="4" fill="var(--apt-turquoise)" />
              </motion.g>
            ))}
        </AnimatePresence>
        <AnimatePresence>
          {stage >= 3 && (
            <motion.circle
              cx={ORIGIN.x}
              cy={ORIGIN.y}
              r="12"
              fill="none"
              stroke="var(--apt-lime)"
              strokeWidth={1.5}
              initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </svg>

      <div className="absolute left-6 top-6 flex flex-col items-start gap-2 sm:left-8 sm:top-8">
        <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm">
          <span className={`size-1.5 shrink-0 rounded-full ${stage >= 1 ? "bg-lime" : "bg-white"}`} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
            {stage >= 1 ? "Resultado confirmado" : "Partido en curso"}
          </span>
        </span>

        <AnimatePresence>
          {stage >= 1 && (
            <motion.span
              initial={reduced ? undefined : { opacity: 0, x: -12 }}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: EASE_SECONDARY }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-turquoise" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                Historial
              </span>
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 2 && (
            <motion.span
              initial={reduced ? undefined : { opacity: 0, x: -12 }}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: EASE_SECONDARY, delay: 0.05 }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-lime" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                Ranking local
              </span>
              <span className="text-[10px] text-white/45">Riviera ID</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          App Riviera
        </p>
        <AnimatePresence>
          {stage >= 3 && (
            <motion.a
              href={rivieraOpen}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir al sitio oficial de Riviera Open"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display rounded-sm text-xs font-bold uppercase tracking-[0.16em] text-turquoise underline decoration-turquoise/40 underline-offset-4 transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              Riviera Open
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
