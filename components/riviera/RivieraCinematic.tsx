"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RivieraVisual } from "@/components/riviera/RivieraVisual";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { rivieraOpen } from "@/lib/data/links";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

interface Stage {
  title: string;
  text: string;
  benefits: [string, string];
}

const STAGES: Stage[] = [
  {
    title: "Compites.",
    text: "Cada partido que juegas en APT queda registrado, torneo tras torneo.",
    benefits: ["Cancha activa", "Trayectoria en vivo"],
  },
  {
    title: "Tu resultado queda registrado.",
    text: "Los marcadores oficiales se guardan automáticamente al terminar cada partido.",
    benefits: ["Resultado oficial", "Historial actualizado"],
  },
  {
    title: "Tu ranking se actualiza.",
    text: "Cada resultado mueve tu posición dentro de la comunidad APT.",
    benefits: ["Ranking local", "Riviera ID"],
  },
  {
    title: "Te conectas al ecosistema nacional.",
    text: "Tu evolución en APT también cuenta dentro de Riviera Open.",
    benefits: ["Red nacional", "Riviera Open"],
  },
];

interface ScrollTriggerLike {
  start: number;
  end: number;
}

function StageControls({
  stage,
  onSelect,
}: {
  stage: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        {STAGES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Ir a la etapa ${i + 1}: ${s.title}`}
            aria-current={i === stage}
            className="group flex-1 rounded-sm py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
          >
            <span
              className={`block h-[3px] rounded-full transition-colors duration-300 ${
                i <= stage ? "bg-turquoise" : "bg-white/15 group-hover:bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {STAGES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Ir a la etapa ${i + 1}: ${s.title}`}
            aria-current={i === stage}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise ${
              i === stage
                ? "border-turquoise/50 bg-turquoise/10 text-turquoise"
                : "border-white/15 text-white/50 hover:text-white/80"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </>
  );
}

function RivieraCTA() {
  return (
    <div className="mt-8 flex flex-col items-start gap-2">
      <MagneticButton href={rivieraOpen} variant="turquoise" external>
        Conocer Riviera Open
      </MagneticButton>
      <p className="text-xs text-white/35">Integración con Riviera App — próximamente</p>
    </div>
  );
}

export function RivieraCinematic() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTriggerLike | null>(null);

  useEffect(() => {
    if (reduced) return;
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
        const mm = gsap.matchMedia();

        // Pin y scrub solo en desktop — en móvil/tablet las 4 etapas se
        // muestran apiladas (ver JSX), no hace falta ni tiene sentido pinear.
        mm.add("(min-width: 1024px)", () => {
          const st = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=180%",
            scrub: 0.7,
            pin: stickyRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setStage(Math.min(3, Math.floor(self.progress * 4)));
            },
          });
          triggerRef.current = st;

          return () => {
            triggerRef.current = null;
          };
        });
      }, wrapperRef);
    })();

    return () => {
      cancelled = true;
      triggerRef.current = null;
      ctx?.revert();
    };
  }, [reduced]);

  function goToStage(i: number) {
    // Actualiza de inmediato: el control nunca depende solo del scroll
    // para reflejar el cambio (funciona igual con teclado o con
    // prefers-reduced-motion, donde no existe ScrollTrigger).
    setStage(i);
    const st = triggerRef.current;
    if (st) {
      const target = st.start + ((i + 0.5) / 4) * (st.end - st.start);
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <section
      id="riviera-app"
      className="riviera-section relative scroll-mt-20 overflow-hidden bg-navy-deep"
    >
      {/* Desktop: escena pinneada e interactiva */}
      <div ref={wrapperRef} className="hidden w-full lg:block">
        <div ref={stickyRef} className="apt-container">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
            Tecnología para competir mejor
          </p>

          <div className="riviera-stage mt-6">
            <div>
              <StageControls stage={stage} onSelect={goToStage} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={reduced ? undefined : { opacity: 0, y: 14 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: EASE_SECONDARY }}
                  className="mt-6 min-h-[210px]"
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
                  <div className="mt-5 flex flex-wrap gap-2">
                    {STAGES[stage].benefits.map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <RivieraCTA />
            </div>

            <div className="riviera-visual-frame">
              <RivieraVisual stage={stage} />
            </div>
          </div>
        </div>
      </div>

      {/* Móvil / tablet: las 4 etapas apiladas, cada una con su propio
          texto y su propia instantánea visual — sin pin, sin depender
          del scroll para "activarse". */}
      <div className="apt-container w-full lg:hidden">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
          Tecnología para competir mejor
        </p>

        <div className="mt-8 flex flex-col gap-10">
          {STAGES.map((s, i) => (
            <div key={s.title}>
              <p className="font-display text-sm font-bold text-turquoise">
                {String(i + 1).padStart(2, "0")} / 04
              </p>
              <h2 className="font-display mt-2 text-[length:var(--heading-sm)] font-bold uppercase leading-[1.05] text-white">
                {s.title}
              </h2>
              <p className="mt-3 max-w-lg text-[length:var(--text-body)] leading-relaxed text-white/65">
                {s.text}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.benefits.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="riviera-visual-frame mt-5">
                <RivieraVisual stage={i} />
              </div>
            </div>
          ))}
        </div>

        <RivieraCTA />
      </div>
    </section>
  );
}
