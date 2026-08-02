"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { FormatsVisual } from "@/components/formats/FormatsVisual";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { competitionFormats } from "@/lib/data/community";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = competitionFormats[active];

  return (
    <section id="experiencia" className="apt-section scroll-mt-20 bg-surface">
      <div className="apt-container">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:items-start">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Formas de competir
            </p>
            <RevealText
              as="h2"
              splitBy="word"
              className="font-display text-[length:var(--heading-md)] font-bold leading-[1.05] tracking-tight text-navy-deep"
            >
              Siempre en movimiento
            </RevealText>
            <p className="mt-4 max-w-md text-[length:var(--text-body)] leading-relaxed text-muted">
              APT organiza distintas dinámicas para mantener activa a su
              comunidad. Explora el formato que mejor se ajuste a tu forma de
              jugar.
            </p>

            <div className="formats-visual-frame mt-8">
              <FormatsVisual
                index={active}
                number={String(active + 1).padStart(2, "0")}
                name={current.name}
              />
            </div>
          </div>

          <div className="lg:pt-2">
            {competitionFormats.map((format, i) => {
              const isActive = i === active;
              return (
                <div key={format.name} className="border-b border-border/70">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-4 py-4 text-left lg:py-5"
                  >
                    <span
                      className={`font-display text-sm font-bold transition-colors ${isActive ? "text-turquoise" : "text-navy/35"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display flex-1 text-lg font-bold uppercase tracking-tight transition-colors sm:text-xl ${isActive ? "text-navy-deep" : "text-navy/50"}`}
                    >
                      {format.name}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className={`size-4 shrink-0 transition-all duration-300 ${isActive ? "translate-x-0 translate-y-0 opacity-100 text-turquoise" : "-translate-x-1 translate-y-1 opacity-0 text-navy"}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={reduced ? undefined : { height: 0, opacity: 0 }}
                        animate={reduced ? undefined : { height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_SECONDARY }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pl-9 pr-8 text-[length:var(--text-small)] leading-relaxed text-muted lg:pb-5">
                          {format.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
