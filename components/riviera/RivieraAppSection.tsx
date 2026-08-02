"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Fingerprint,
  History,
  Smartphone,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "@/components/apt/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";

const BENEFITS = [
  { icon: Trophy, text: "Resultados actualizados al finalizar los partidos" },
  { icon: History, text: "Historial individual de competencias" },
  { icon: BarChart3, text: "Ranking local de APT" },
  { icon: Activity, text: "Conexión con el ranking nacional" },
  { icon: Fingerprint, text: "Perfil único mediante Riviera ID" },
  { icon: Smartphone, text: "Consulta desde cualquier dispositivo" },
];

/** Barras abstractas que representan movimiento de puntos — no una captura real de la app. */
function DataComposition() {
  const reduced = useReducedMotion();
  const bars = [62, 88, 45, 96, 70, 54, 82];

  return (
    <div
      aria-hidden
      className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
        Composición gráfica — representación abstracta
      </p>

      <div className="mt-8 flex h-40 items-end gap-3">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-turquoise to-lime/70"
            initial={reduced ? undefined : { height: 0 }}
            whileInView={reduced ? undefined : { height: `${h}%` }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={reduced ? { height: `${h}%` } : undefined}
          />
        ))}
      </div>

      <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
        {[
          { label: "RIV-4471", points: "1,280 pts" },
          { label: "RIV-3390", points: "1,195 pts" },
          { label: "RIV-5518", points: "1,140 pts" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="font-mono text-white/50">{row.label}</span>
            <span className="h-px flex-1 mx-3 bg-white/10" />
            <span className="font-display font-bold text-white">{row.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RivieraAppSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 lg:py-28">
      <div className="apt-grain" />
      <div className="apt-container relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Tecnología para competir mejor"
            title="APT UTILIZA RIVIERA APP"
            description="La comunidad gestiona sus competencias con un sistema profesional que registra resultados, historial, participación y rendimiento de cada jugador."
            onDark
          />

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon aria-hidden className="size-4 text-turquoise" />
                </span>
                <span className="text-sm leading-relaxed text-white/75">
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <MagneticButton href="/riviera-app" variant="turquoise">
              Conocer Riviera App
            </MagneticButton>
          </div>
        </div>

        <DataComposition />
      </div>
    </section>
  );
}
