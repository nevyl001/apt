"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RivieraVisual } from "@/components/riviera/RivieraVisual";
import { RivieraScene } from "@/components/riviera/RivieraScene";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { rivieraOpen } from "@/lib/data/links";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

interface Stage {
  tab: string;
  title: string;
  text: string;
  benefits: [string, string, string];
}

const STAGES: Stage[] = [
  {
    tab: "Compites",
    title: "Compites.",
    text: "Cada partido que juegas en APT queda registrado, torneo tras torneo.",
    benefits: ["Cancha activa", "Trayectoria en vivo", "Partido APT"],
  },
  {
    tab: "Resultado",
    title: "Tu resultado queda registrado.",
    text: "Los marcadores oficiales se guardan automáticamente al terminar cada partido.",
    benefits: ["Resultado oficial", "Historial", "Registro inmediato"],
  },
  {
    tab: "Ranking",
    title: "Tu ranking se actualiza.",
    text: "Cada resultado mueve tu posición dentro de la comunidad APT.",
    benefits: ["Ranking local", "Riviera ID", "Evolución visible"],
  },
  {
    tab: "Conexión",
    title: "Te conectas al ecosistema nacional.",
    text: "Tu evolución en APT también cuenta dentro de Riviera Open.",
    benefits: ["Conexión nacional", "Comunidad APT", "Riviera Open"],
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
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Etapas de Riviera App">
      {STAGES.map((s, i) => (
        <button
          key={s.tab}
          type="button"
          role="tab"
          onClick={() => onSelect(i)}
          aria-selected={i === stage}
          aria-controls="riviera-stage-panel"
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise ${
            i === stage
              ? "border-turquoise/60 bg-turquoise/10 text-turquoise"
              : "border-white/15 text-white/55 hover:border-white/30 hover:text-white/85"
          }`}
        >
          {String(i + 1).padStart(2, "0")} {s.tab}
        </button>
      ))}
    </div>
  );
}

function RivieraCTA() {
  return (
    <div className="mt-6 flex flex-col items-start gap-2">
      <MagneticButton href={rivieraOpen} variant="turquoise" external>
        Conocer Riviera Open
      </MagneticButton>
      <p className="text-xs text-white/35">
        Integración con Riviera App — próximamente
      </p>
    </div>
  );
}

function StageCopy({ stage }: { stage: number }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        id="riviera-stage-panel"
        role="tabpanel"
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: EASE_SECONDARY }}
        className="mt-5"
      >
        <p className="font-display text-sm font-bold text-turquoise">
          {String(stage + 1).padStart(2, "0")} / 04
        </p>
        <h2 className="font-display mt-2 text-[length:var(--heading-sm)] font-bold uppercase leading-[1.05] text-white">
          {STAGES[stage].title}
        </h2>
        <p className="mt-3 max-w-md text-[length:var(--text-body)] leading-relaxed text-white/65">
          {STAGES[stage].text}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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
  );
}

export function RivieraCinematic() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [tabletStage, setTabletStage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);
  const trajectoryRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<ScrollTriggerLike | null>(null);

  useEffect(() => {
    if (reduced || !window.matchMedia("(min-width: 1024px)").matches) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [gsapModule, scrollTriggerModule, motionPathModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/MotionPathPlugin"),
      ]);
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const MotionPathPlugin = motionPathModule.MotionPathPlugin;
      if (cancelled || !wrapperRef.current || !stickyRef.current) return;

      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=260%",
                scrub: 0.75,
                pin: stickyRef.current,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  setStage(Math.min(3, Math.floor(self.progress * 4)));
                },
              },
            });

            if (ballRef.current && trajectoryRef.current) {
              tl.to(
                ballRef.current,
                {
                  motionPath: {
                    path: trajectoryRef.current,
                    align: trajectoryRef.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                  },
                  ease: "none",
                },
                0,
              );
            }

            triggerRef.current = tl.scrollTrigger ?? null;

            return () => {
              triggerRef.current = null;
            };
          },
        );
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
      className="riviera-viewport relative scroll-mt-20 overflow-hidden bg-navy-deep"
    >
      {/* Desktop (>=1024px): escena pinneada, pelota controlada por GSAP MotionPath */}
      <div ref={wrapperRef} className="hidden w-full lg:block">
        <div ref={stickyRef} className="riviera-inner">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
            Tecnología para competir mejor
          </p>

          <div className="riviera-stage mt-6">
            <div>
              <StageControls stage={stage} onSelect={goToStage} />
              <StageCopy stage={stage} />
              <RivieraCTA />
            </div>

            <div className="riviera-visual-frame">
              <RivieraScene stage={stage} ballRef={ballRef} trajectoryRef={trajectoryRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet (768–1023px): una columna amplia, tabs arriba, escena debajo — sin pin */}
      <div className="riviera-inner hidden w-full md:block lg:hidden">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
          Tecnología para competir mejor
        </p>
        <div className="riviera-stage--tablet mt-6">
          <StageControls stage={tabletStage} onSelect={setTabletStage} />
          <div className="riviera-visual-frame">
            <RivieraVisual stage={tabletStage} />
          </div>
          <StageCopy stage={tabletStage} />
          <RivieraCTA />
        </div>
      </div>

      {/* Móvil (<768px): las 4 etapas apiladas, cada una con su propio
          texto y su propia instantánea visual — sin pin, sin controles. */}
      <div className="riviera-inner w-full md:hidden">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
          Tecnología para competir mejor
        </p>

        <div className="mt-8 flex flex-col gap-10">
          {STAGES.map((s, i) => (
            <div key={s.tab}>
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
