import type { Metadata } from "next";
import { ComingSoonSection } from "@/components/apt/ComingSoonSection";

export const metadata: Metadata = { title: "Resultados" };

export default function ResultadosPage() {
  return (
    <ComingSoonSection
      eyebrow="Actividad reciente"
      title="RESULTADOS"
      description="El historial de partidos y marcadores de cada evento APT llega en la siguiente fase del sitio."
    />
  );
}
