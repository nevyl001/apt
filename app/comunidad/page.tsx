import type { Metadata } from "next";
import { ComingSoonSection } from "@/components/apt/ComingSoonSection";

export const metadata: Metadata = { title: "Comunidad" };

export default function ComunidadPage() {
  return (
    <ComingSoonSection
      eyebrow="Más que organizar partidos"
      title="COMUNIDAD APT"
      description="Galería de campeones, finales, podios y sedes con fotografía real de la comunidad llega en la siguiente fase del sitio."
    />
  );
}
