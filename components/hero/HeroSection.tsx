import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { whatsappCommunity } from "@/lib/data/links";

const TITLE_LINES = ["Compite.", "Conecta.", "Crece."];

export function HeroSection() {
  return (
    <section id="inicio" className="hero-section relative overflow-hidden bg-white">
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise sm:text-sm">
              Acapulco Padel Tour
            </p>

            <h1 className="hero-title font-display mt-4 font-bold uppercase text-navy-deep">
              {TITLE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-4 max-w-md text-[length:var(--text-body)] leading-relaxed text-muted">
              Una nueva comunidad de pádel en Acapulco creada para organizar
              mejores competencias, conectar jugadores y hacer que cada
              partido cuente.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton href={whatsappCommunity} variant="lime" external>
                Unirme a APT
              </MagneticButton>
              <MagneticButton href="#eventos" variant="outline">
                Ver próximos eventos
              </MagneticButton>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted sm:text-sm">
              Comunidad gestionada mediante App Riviera
            </p>
          </div>

          <div aria-hidden className="hero-visual-frame">
            <HeroVisual />
          </div>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label="Ir a la siguiente sección"
        className="hero-scroll-cue group text-navy/70 transition-colors hover:text-navy"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
          Descubre más
        </span>
        <ChevronDown
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
        />
      </a>
    </section>
  );
}
