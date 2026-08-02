import type { Metadata } from "next";
import { ComingSoonSection } from "@/components/apt/ComingSoonSection";

export const metadata: Metadata = { title: "Riviera App" };

export default function RivieraAppPage() {
  return (
    <ComingSoonSection
      eyebrow="Tecnología para competir mejor"
      title="RIVIERA APP"
      description="El detalle completo sobre cómo APT usa Riviera App para gestionar resultados, historial y ranking llega en la siguiente fase del sitio."
    />
  );
}
