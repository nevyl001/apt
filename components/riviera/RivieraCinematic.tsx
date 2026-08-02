"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RivieraVisual } from "@/components/riviera/RivieraVisual";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { rivieraApp } from "@/lib/data/links";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

interface Stage {
  title: string;
  text: string;
}

const STAGES: Stage[] = [
  {
    title: "Compites.",
    text: "Cada partido que juegas en APT queda registrado, torneo tras torneo.",
  },
  {
    title: "Tu resultado queda registrado.",
    text: "Los marcadores oficiales se guardan automáticamente al terminar cada partido.",
  },
  {
    title: "Tu ranking se actualiza.",
    text: "Cada resultado mueve tu posición dentro de la comunidad APT.",
  },
  {
    title: "Te conectas al ecosistema nacional.",
    text: "Tu evolución en APT también cuenta dentro de Riviera Open.",
  },
];

export function RivieraCinematic() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<{ start: number; end: number; kill: () => void } | null>(null);

  useEffect(() => {
    if (reduced || !window.matchMedia("(min-width: 1024px)").matches) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      if (cancelled || !wrapperRef.current || !stickyRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=250%",
          pin: stickyRef.current,
          scrub: 0.6,
          onUpdate: (self) => {
            setStage(Math.min(3, Math.floor(self.progress * 4)));
          },
        });
        triggerRef.current = st;
      }, wrapperRef);
    })();

    return () => {
      cancelled = true;
      triggerRef.current = null;
      ctx?.revert();
    };
  }, [reduced]);

  function goToStage(i: number) {
    const st = triggerRef.current;
    if (st) {
      const target = st.start + ((i + 0.5) / 4) * (st.end - st.start);
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    setStage(i);
  }

  return (
    <section
      id="riviera-app"
      className="apt-section apt-section--lg relative scroll-mt-20 overflow-hidden bg-navy-deep"
    >
      <div ref={wrapperRef}>
        <div ref={stickyRef} className="apt-container">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
            Tecnología para competir mejor
          </p>

          <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-2">
                {STAGES.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goToStage(i)}
                    aria-label={`Ir a: ${s.title}`}
                    aria-current={i === stage}
                    className="group flex-1 py-2"
                  >
                    <span
                      className={`block h-[3px] rounded-full transition-colors duration-300 ${
                        i <= stage ? "bg-turquoise" : "bg-white/15 group-hover:bg-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={reduced ? undefined : { opacity: 0, y: 14 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: EASE_SECONDARY }}
                  className="min-h-[180px] sm:min-h-[160px]"
                >
                  <p className="font-display text-sm font-bold text-turquoise">
                    {String(stage + 1).padStart(2, "0")} / 04
                  </p>
                  <h2 className="font-display mt-2 text-[length:var(--heading-sm)] font-bold uppercase leading-[1.05] text-white">
                    {STAGES[stage].title}
                  </h2>
                  <p className="mt-4 max-w-lg text-[length:var(--text-body)] leading-relaxed text-white/65">
                    {STAGES[stage].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {STAGES.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goToStage(i)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      i === stage
                        ? "border-turquoise/50 bg-turquoise/10 text-turquoise"
                        : "border-white/10 text-white/40 hover:text-white/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton href={rivieraApp} variant="turquoise" external>
                  Conocer Riviera App
                </MagneticButton>
              </div>
            </div>

            <div className="riviera-visual-frame">
              <RivieraVisual stage={stage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
