"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { whatsappCommunity } from "@/lib/data/links";
import { DURATION, EASE_PRIMARY, EASE_SECONDARY } from "@/lib/motion/tokens";

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contacto"
      className="final-cta-section relative scroll-mt-20 overflow-hidden bg-navy"
    >
      <div className="apt-grain" />

      <div aria-hidden className="absolute -left-16 bottom-0 size-72 rounded-full bg-turquoise/10 blur-3xl" />

      <svg
        aria-hidden
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      >
        <motion.path
          d="M -50 60 C 250 220, 550 40, 850 220 S 1150 420, 1260 380"
          fill="none"
          stroke="var(--apt-turquoise)"
          strokeWidth={1.5}
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.section * 1.5, ease: EASE_PRIMARY }}
        />
        <circle cx="850" cy="220" r="4" fill="var(--apt-lime)" opacity={0.8} />
        <circle cx="180" cy="130" r="3" fill="var(--apt-white)" opacity={0.4} />
      </svg>

      <div className="apt-container relative w-full">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Únete a la comunidad
            </p>
            <RevealText
              as="h2"
              splitBy="word"
              className="font-display mt-3 max-w-2xl text-[length:var(--heading-md)] font-bold uppercase leading-[1.02] text-white"
            >
              Tu próximo partido puede empezar aquí
            </RevealText>
            <p className="mt-5 max-w-md text-[length:var(--text-body)] leading-relaxed text-white/70">
              Únete a APT y forma parte de una comunidad creada para competir,
              crecer y disfrutar el pádel.
            </p>
          </div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.reveal, delay: 0.15, ease: EASE_SECONDARY }}
            className="flex flex-col items-start gap-4 lg:items-end"
          >
            <MagneticButton href={whatsappCommunity} variant="lime" external>
              Unirme por WhatsApp
            </MagneticButton>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
              180+ jugadores · Acapulco, Guerrero
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
