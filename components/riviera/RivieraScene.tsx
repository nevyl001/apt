"use client";

import type { RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { rivieraOpen } from "@/lib/data/links";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

const PLAYERS = [
  { x: 200, y: 150 },
  { x: 280, y: 240 },
  { x: 160, y: 260 },
];

const NETWORK_NODES = [
  { x: 90, y: 70 },
  { x: 410, y: 90 },
  { x: 70, y: 310 },
  { x: 420, y: 320 },
];

const ORIGIN = { x: 240, y: 195 };

/** Trayectoria única: entra abajo-izquierda, cruza la red, rebota, sale arriba-derecha. */
export const TRAJECTORY_D =
  "M 30 340 C 100 300 160 250 240 195 C 300 150 255 95 300 60 C 340 28 420 18 460 8";

interface RivieraSceneProps {
  stage: number;
  ballRef: RefObject<SVGCircleElement | null>;
  trajectoryRef: RefObject<SVGPathElement | null>;
}

/**
 * Escena de escritorio: la misma cancha que RivieraVisual, pero la pelota
 * la controla GSAP MotionPath desde el padre (RivieraCinematic) a través
 * de `ballRef`/`trajectoryRef` — su posición está atada al scrub del pin,
 * no a `stage`. Las etiquetas (marcador, historial, ranking, red) sí
 * reaccionan a `stage`, igual que en la versión estática.
 */
export function RivieraScene({ stage, ballRef, trajectoryRef }: RivieraSceneProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-deep">
      <div className="apt-grain" />

      <svg
        aria-hidden
        viewBox="0 0 480 380"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon
          points="90,300 390,300 350,90 130,90"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1.4}
        />
        <line x1="240" y1="90" x2="240" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
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

        {/* Trayectoria completa de la pelota — visible como hilo de fondo */}
        <path
          ref={trajectoryRef}
          d={TRAJECTORY_D}
          fill="none"
          stroke="var(--apt-turquoise)"
          strokeWidth={1.5}
          strokeOpacity={0.35}
          strokeDasharray="3 6"
        />
        <circle ref={ballRef} cx="30" cy="340" r="7" fill="var(--apt-lime)" />

        <AnimatePresence>
          {stage >= 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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

        <AnimatePresence>
          {stage >= 3 &&
            NETWORK_NODES.map((n, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
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
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
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
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
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
          Riviera App
        </p>
        <AnimatePresence>
          {stage >= 3 && (
            <motion.a
              href={rivieraOpen}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir al sitio oficial de Riviera Open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
