"use client";

import { motion } from "motion/react";
import { RevealText } from "@/components/motion/RevealText";
import { AboutVisual } from "@/components/about/AboutVisual";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { aboutParagraphs } from "@/lib/data/community";
import { DURATION, EASE_PRIMARY } from "@/lib/motion/tokens";

export function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="nosotros" className="apt-section apt-section--sm scroll-mt-20">
      <div className="apt-container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Quiénes somos
            </p>
            <RevealText
              as="h2"
              splitBy="word"
              className="font-display text-[length:var(--heading-md)] font-bold leading-[1.05] tracking-tight text-navy-deep"
            >
              Más que organizar partidos, queremos construir comunidad
            </RevealText>
          </div>

          <div className="flex flex-col justify-center gap-3 lg:pt-2">
            <p className="text-[length:var(--text-body)] leading-relaxed text-ink">
              {aboutParagraphs[0]}
            </p>
            <p className="text-[length:var(--text-small)] leading-relaxed text-muted">
              {aboutParagraphs[1]}
            </p>
          </div>
        </div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.98 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DURATION.section, ease: EASE_PRIMARY }}
          className="about-visual-frame mt-10 lg:mt-14"
        >
          <AboutVisual />
        </motion.div>
      </div>
    </section>
  );
}
