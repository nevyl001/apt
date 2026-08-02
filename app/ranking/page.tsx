import type { Metadata } from "next";
import { ComingSoonSection } from "@/components/apt/ComingSoonSection";

export const metadata: Metadata = { title: "Ranking" };

export default function RankingPage() {
  return (
    <ComingSoonSection
      eyebrow="Clasificación"
      title="RANKING COMPLETO"
      description="La tabla completa de posiciones, con filtros por categoría y comparación entre el ranking APT y el ranking nacional, llega en la siguiente fase del sitio."
    />
  );
}
