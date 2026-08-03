"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { competitionFormats } from "@/lib/data/community";

const TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

interface FormatsVisualProps {
  formatId: string;
  number: string;
}

function Court() {
  return (
    <polygon
      points="90,300 390,300 350,100 130,100"
      fill="none"
      stroke="rgba(255,255,255,0.16)"
      strokeWidth={1.4}
    />
  );
}

function RetasScene() {
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Court />
      <line x1="240" y1="100" x2="240" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <line x1="118" y1="200" x2="362" y2="200" stroke="var(--apt-turquoise)" strokeOpacity={0.55} strokeWidth={2} />
      {[
        [170, 160],
        [170, 240],
      ].map(([cx, cy], i) => (
        <circle key={`a${i}`} cx={cx} cy={cy} r="7" fill="var(--apt-white)" fillOpacity={0.9} />
      ))}
      {[
        [310, 160],
        [310, 240],
      ].map(([cx, cy], i) => (
        <circle key={`b${i}`} cx={cx} cy={cy} r="7" fill="var(--apt-lime)" />
      ))}
    </svg>
  );
}

function AmericanoScene() {
  const players: [number, number][] = [
    [180, 140],
    [300, 140],
    [180, 260],
    [300, 260],
  ];
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Court />
      <motion.path
        d="M 180 140 C 260 110, 340 170, 300 260 C 260 320, 150 300, 180 140"
        fill="none"
        stroke="var(--apt-lime)"
        strokeWidth={1.6}
        strokeLinecap="round"
        markerEnd="url(#rotate-arrow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={TRANSITION}
      />
      <defs>
        <marker id="rotate-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--apt-lime)" />
        </marker>
      </defs>
      {players.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" fill="var(--apt-white)" fillOpacity={0.9} />
      ))}
    </svg>
  );
}

function DueloScene() {
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Court />
      <line x1="240" y1="95" x2="240" y2="305" stroke="var(--apt-turquoise)" strokeWidth={2} strokeOpacity={0.55} />
      {[
        [165, 160],
        [165, 240],
      ].map(([cx, cy], i) => (
        <circle key={`a${i}`} cx={cx} cy={cy} r="8" fill="var(--apt-turquoise)" />
      ))}
      {[
        [315, 160],
        [315, 240],
      ].map(([cx, cy], i) => (
        <circle key={`b${i}`} cx={cx} cy={cy} r="8" fill="var(--apt-lime)" />
      ))}
      <text
        x="240"
        y="207"
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize="20"
        fontWeight="700"
        letterSpacing="2"
      >
        VS
      </text>
    </svg>
  );
}

function TorneoExpressScene() {
  const groups = [
    { x: 130, y: 140 },
    { x: 240, y: 120 },
    { x: 350, y: 140 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Court />
      {groups.map((g, i) => (
        <g key={i}>
          <circle cx={g.x - 12} cy={g.y} r="5" fill="rgba(255,255,255,0.5)" />
          <circle cx={g.x + 12} cy={g.y} r="5" fill="rgba(255,255,255,0.5)" />
          <motion.path
            d={`M ${g.x} ${g.y + 8} L 240 220`}
            stroke="var(--apt-lime)"
            strokeOpacity={0.55}
            strokeWidth={1.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...TRANSITION, delay: i * 0.05 }}
          />
        </g>
      ))}
      <circle cx="240" cy="220" r="9" fill="var(--apt-lime)" />
    </svg>
  );
}

function LigasScene() {
  const rows = [55, 90, 70, 40];
  const jornadas = [true, true, true, false, false, false];
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Court />
      {rows.map((w, i) => (
        <motion.rect
          key={i}
          x={190}
          y={130 + i * 22}
          height={9}
          rx={4.5}
          fill={i === 1 ? "var(--apt-lime)" : "rgba(255,255,255,0.2)"}
          initial={{ width: 0 }}
          animate={{ width: w }}
          transition={{ ...TRANSITION, delay: i * 0.04 }}
        />
      ))}
      {jornadas.map((done, i) => (
        <circle
          key={i}
          cx={190 + i * 18}
          cy={240}
          r={4}
          fill={done ? "var(--apt-turquoise)" : "rgba(255,255,255,0.18)"}
        />
      ))}
    </svg>
  );
}

function TorneosScene() {
  const r1 = [130, 170, 230, 270];
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Court />
      {r1.map((y, i) => (
        <line key={i} x1={140} y1={y} x2={175} y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth={1.4} />
      ))}
      <path d="M 175 130 L 195 130 L 195 170 L 175 170 M 175 150 L 195 150" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1.4} />
      <path d="M 175 230 L 195 230 L 195 270 L 175 270 M 175 250 L 195 250" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1.4} />
      <motion.path
        d="M 195 150 L 220 150 L 220 200 L 240 200 M 220 250 L 220 200"
        fill="none"
        stroke="var(--apt-lime)"
        strokeWidth={1.8}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={TRANSITION}
      />
      <path d="M 195 250 L 220 250" stroke="rgba(255,255,255,0.35)" strokeWidth={1.4} />
      <circle cx="240" cy="200" r="9" fill="var(--apt-lime)" />
    </svg>
  );
}

function EspecialesScene() {
  const modules = [
    { x: 150, y: 130, w: 60, h: 44 },
    { x: 225, y: 110, w: 44, h: 44 },
    { x: 150, y: 190, w: 44, h: 60 },
    { x: 220, y: 200, w: 70, h: 44 },
    { x: 305, y: 140, w: 44, h: 90 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 480 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      {modules.map((m, i) => (
        <motion.rect
          key={i}
          x={m.x}
          y={m.y}
          width={m.w}
          height={m.h}
          rx={8}
          fill="none"
          stroke={i % 2 === 0 ? "var(--apt-lime)" : "rgba(255,255,255,0.3)"}
          strokeWidth={1.4}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...TRANSITION, delay: i * 0.04 }}
        />
      ))}
    </svg>
  );
}

const SCENES: Record<string, () => React.ReactElement> = {
  retas: RetasScene,
  americano: AmericanoScene,
  duelo: DueloScene,
  "torneo-express": TorneoExpressScene,
  ligas: LigasScene,
  torneos: TorneosScene,
  especiales: EspecialesScene,
};

const SCENE_CAPTION: Record<string, string> = {
  retas: "Partido abierto",
  americano: "Las parejas rotan cada ronda",
  duelo: "",
  "torneo-express": "Grupos hacia la final",
  ligas: "Temporada en curso",
  torneos: "Camino a la final",
  especiales: "Diseñado a medida",
};

/**
 * Panel protagonista: nombre, frase, escena y atributos viven aquí — nada
 * se repite fuera de este panel. Solo sus capas interiores cambian entre
 * formatos, nunca sus dimensiones (ver .formats-visual-frame).
 */
export function FormatsVisual({ formatId, number }: FormatsVisualProps) {
  const reduced = useReducedMotion();
  const format = competitionFormats.find((f) => f.id === formatId) ?? competitionFormats[0];
  const Scene = SCENES[formatId] ?? RetasScene;
  const caption = SCENE_CAPTION[formatId];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep">
      <div className="apt-grain" />

      <AnimatePresence mode={reduced ? "sync" : "wait"} initial={false}>
        <motion.div
          key={formatId}
          className="absolute inset-0"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={TRANSITION}
        >
          <Scene />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-navy-deep/90 via-navy-deep/40 to-transparent px-5 pb-16 pt-5 sm:px-7 sm:pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
          Formato {number}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={formatId}
            initial={reduced ? undefined : { opacity: 0, y: 6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={TRANSITION}
          >
            <h3 className="font-display mt-1 text-2xl font-bold uppercase text-white sm:text-3xl">
              {format.name}
            </h3>
            <p className="mt-1.5 max-w-sm text-sm leading-snug text-white/65">
              {format.tagline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy-deep/95 via-navy-deep/50 to-transparent px-5 pb-5 pt-14 sm:px-7 sm:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={formatId}
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={TRANSITION}
          >
            {caption && (
              <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-turquoise/85">
                {caption}
              </p>
            )}
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
              {format.attributes.join(" · ")}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
