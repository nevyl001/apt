"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PlayerRanking, RankingScope } from "@/lib/types";
import { SectionHeading } from "@/components/apt/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RankingRow } from "@/components/ranking/RankingRow";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { cn } from "@/lib/utils/cn";

const TABS: { value: RankingScope; label: string }[] = [
  { value: "apt", label: "Ranking APT" },
  { value: "national", label: "Ranking nacional" },
  { value: "most_active", label: "Más activos" },
  { value: "best_evolution", label: "Mejor evolución" },
];

export function RankingPreview({
  aptRanking,
  nationalRanking,
}: {
  aptRanking: PlayerRanking[];
  nationalRanking: PlayerRanking[];
}) {
  const [tab, setTab] = useState<RankingScope>("apt");
  const reduced = useReducedMotion();

  const rows = useMemo(() => {
    switch (tab) {
      case "national":
        return nationalRanking;
      case "most_active":
        return [...aptRanking].sort((a, b) => b.matchesPlayed - a.matchesPlayed);
      case "best_evolution":
        return [...aptRanking].sort((a, b) => {
          const deltaA = (a.previousPosition ?? a.position) - a.position;
          const deltaB = (b.previousPosition ?? b.position) - b.position;
          return deltaB - deltaA;
        });
      default:
        return aptRanking;
    }
  }, [tab, aptRanking, nationalRanking]);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="apt-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Ranking de la comunidad"
              title="CADA PARTIDO CONSTRUYE TU HISTORIA"
              description="Los resultados organizados por APT quedan registrados en Riviera App y actualizan la posición de los jugadores al terminar cada competencia."
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              El ranking local reconoce el desempeño dentro de APT. El
              ranking nacional conecta la actividad del jugador con el
              ecosistema Riviera Open.
            </p>
            <div className="mt-8">
              <MagneticButton href="/ranking" variant="outline">
                Ver ranking completo
              </MagneticButton>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-3 shadow-[0_24px_60px_-32px_rgba(0,43,107,0.25)] sm:p-5">
            <div
              role="tablist"
              aria-label="Vistas del ranking"
              className="apt-scroll-x flex gap-1 overflow-x-auto pb-1"
            >
              {TABS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.value}
                  onClick={() => setTab(item.value)}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm",
                    tab === item.value
                      ? "bg-navy text-white"
                      : "text-muted hover:bg-navy/5 hover:text-navy",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 divide-y divide-border">
              {rows.map((player, i) => (
                <motion.div
                  key={`${tab}-${player.playerId}`}
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <RankingRow player={player} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
