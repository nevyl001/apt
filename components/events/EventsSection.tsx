"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { getWhatsAppLigaUrl } from "@/lib/data/links";
import { DURATION, EASE_SECONDARY } from "@/lib/motion/tokens";

/**
 * Sección #eventos — presentación de la Primera Liga APT.
 * Sin fechas, sedes, categorías ni costos hasta que existan datos oficiales.
 */
export function EventsSection() {
  const reduced = useReducedMotion();
  const whatsappLiga = getWhatsAppLigaUrl();

  return (
    <section id="eventos" className="apt-section apt-section--sm scroll-mt-20">
      <div className="apt-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Primera Liga Acapulco Padel Tour
            </p>
            <RevealText
              as="h2"
              splitBy="word"
              className="font-display text-[length:var(--heading-md)] font-bold leading-[1.05] tracking-tight text-navy-deep"
            >
              Tu próxima competencia comienza aquí
            </RevealText>
            <p className="mt-5 max-w-xl text-[length:var(--text-body)] leading-relaxed text-muted">
              Llega la primera temporada de la Liga APT, una competencia creada
              para ofrecer partidos organizados, seguimiento de resultados y una
              experiencia que mantenga activa a la comunidad.
            </p>
            <p className="mt-3 max-w-xl text-[length:var(--text-body)] leading-relaxed text-muted">
              Consulta tus partidos, registra tus resultados, sigue tu posición
              y compite por avanzar dentro del ranking de la liga.
            </p>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.reveal, ease: EASE_SECONDARY }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {whatsappLiga ? (
                <MagneticButton href={whatsappLiga} variant="lime" external>
                  Quiero participar en la Liga APT
                </MagneticButton>
              ) : (
                <MagneticButton href="#contacto" variant="lime">
                  Quiero participar en la Liga APT
                </MagneticButton>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: DURATION.section, ease: EASE_SECONDARY }}
            className="relative overflow-hidden rounded-3xl bg-navy-deep p-8 text-white sm:p-10"
          >
            <div className="apt-grain" />
            <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-turquoise">
              Liga APT
            </p>
            <h3 className="font-display relative mt-3 text-2xl font-bold uppercase leading-tight sm:text-3xl">
              Primera temporada
            </h3>
            <ul className="relative mt-8 space-y-4 text-sm leading-relaxed text-white/70">
              <li className="border-t border-white/10 pt-4">
                Partidos organizados con seguimiento de resultados
              </li>
              <li className="border-t border-white/10 pt-4">
                Consulta de partidos y registro de marcadores
              </li>
              <li className="border-t border-white/10 pt-4">
                Ranking y posición dentro de la liga
              </li>
              <li className="border-t border-white/10 pt-4">
                Comunidad local activa en Acapulco
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
