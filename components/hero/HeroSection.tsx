import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroVisual } from "@/components/hero/HeroVisual";

const TITLE_LINES = ["Compite.", "Conecta.", "Evoluciona."];

const HERO_META = [
  "Competencias organizadas",
  "Ranking actualizado",
  "Comunidad local",
];

export function HeroSection() {
  return (
    <section id="inicio" className="hero-section relative overflow-hidden bg-white">
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-turquoise sm:text-xs sm:tracking-[0.2em]">
              Acapulco Padel Tour
            </p>

            <h1 className="hero-title font-display mt-3 font-bold uppercase text-navy-deep sm:mt-4">
              {TITLE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-3 max-w-md text-[length:var(--text-body)] leading-relaxed text-muted sm:mt-4">
              Una nueva comunidad creada para transformar la manera de competir
              en Acapulco.
            </p>
            <p className="mt-2.5 max-w-md text-[length:var(--text-small)] leading-relaxed text-muted sm:mt-3">
              Organizamos ligas, torneos, retas, americanos y formatos
              especiales con una estructura clara, seguimiento de resultados y
              una plataforma digital que hace que cada partido cuente.
            </p>

            <div className="hero-actions mt-5 sm:mt-6">
              <MagneticButton href="#eventos" variant="lime">
                Inscríbete a la primera Liga APT
              </MagneticButton>
              <MagneticButton href="#experiencia" variant="outline">
                Conoce nuestros formatos
              </MagneticButton>
            </div>

            <div className="hero-meta mt-4 sm:mt-5" aria-label="Pilares de APT">
              {HERO_META.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
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
