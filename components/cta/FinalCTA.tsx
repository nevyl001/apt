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
      <svg
        aria-hidden
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-30"
      >
        <motion.path
          d="M -50 340 C 250 120, 650 120, 1250 340"
          fill="none"
          stroke="var(--apt-turquoise)"
          strokeWidth={1.5}
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.section * 1.5, ease: EASE_PRIMARY }}
        />
      </svg>

      <div className="apt-container relative text-center">
        <RevealText
          as="h2"
          splitBy="word"
          className="font-display mx-auto max-w-2xl text-[length:var(--heading-md)] font-bold uppercase leading-[1.05] text-white"
        >
          Tu próximo partido puede empezar aquí
        </RevealText>
        <p className="mx-auto mt-5 max-w-md text-[length:var(--text-body)] leading-relaxed text-white/70">
          Únete a APT y forma parte de una comunidad creada para competir,
          crecer y disfrutar el pádel.
        </p>
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.reveal, delay: 0.15, ease: EASE_SECONDARY }}
          className="mt-9"
        >
          <MagneticButton href={whatsappCommunity} variant="lime" external>
            Unirme por WhatsApp
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
