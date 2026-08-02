import type { Metadata } from "next";
import { ComingSoonSection } from "@/components/apt/ComingSoonSection";

export const metadata: Metadata = { title: "Eventos" };

export default function EventosPage() {
  return (
    <ComingSoonSection
      eyebrow="Agenda APT"
      title="TODOS LOS EVENTOS"
      description="El listado completo de retas, torneos, ligas y americanos con filtros y detalle por evento llega en la siguiente fase del sitio."
    />
  );
}
