import { Check } from "lucide-react";
import { SectionHeading } from "@/components/apt/SectionHeading";

const APT_ADMINISTRA = [
  "Su identidad",
  "Sus jugadores",
  "Sus eventos",
  "Sus categorías",
  "Sus reglas",
  "Su comunicación",
];

const RIVIERA_CONECTA = [
  "Resultados",
  "Historial",
  "Ranking",
  "Riviera ID",
  "Actividad nacional",
  "Evolución de jugadores",
];

export function IdentityComparison() {
  return (
    <section className="apt-container py-20 lg:py-28">
      <SectionHeading
        eyebrow="Cómo se dividen los roles"
        title="APT CONSERVA SU IDENTIDAD"
        description="La comunidad mantiene su nombre, imagen, jugadores, eventos y forma de competir. Riviera Open aporta la tecnología que conecta su actividad con un circuito nacional."
      />

      <div className="mt-14 grid overflow-hidden rounded-3xl border border-border sm:grid-cols-2">
        <div className="bg-white p-8 sm:p-10">
          <p className="font-display text-xl font-bold text-navy-deep">
            APT administra
          </p>
          <ul className="mt-6 space-y-4">
            {APT_ADMINISTRA.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-ink/80">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-navy/8">
                  <Check aria-hidden className="size-3.5 text-navy" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-navy-deep p-8 sm:p-10">
          <p className="font-display text-xl font-bold text-white">
            Riviera conecta
          </p>
          <ul className="mt-6 space-y-4">
            {RIVIERA_CONECTA.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-turquoise/20">
                  <Check aria-hidden className="size-3.5 text-turquoise" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="font-display mt-12 text-center text-2xl font-bold text-navy-deep sm:text-3xl">
        Local en su esencia. Nacional en su alcance.
      </p>
    </section>
  );
}
