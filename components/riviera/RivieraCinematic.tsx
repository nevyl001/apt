"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RivieraVisual } from "@/components/riviera/RivieraVisual";
import { RivieraScene } from "@/components/riviera/RivieraScene";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { EASE_SECONDARY } from "@/lib/motion/tokens";

interface Stage {
  tab: string;
  title: string;
  text: string;
}

/** Cinco pasos oficiales de la plataforma digital APT. Sin marcas externas. */
const STAGES: Stage[] = [
  {
    tab: "Inscríbete",
    title: "Inscríbete.",
    text: "Registra tus datos y elige la competencia en la que deseas participar.",
  },
  {
    tab: "Consulta",
    title: "Consulta.",
    text: "Revisa la programación, el orden de juego, la sede y los horarios de tus partidos.",
  },
  {
    tab: "Compite",
    title: "Compite.",
    text: "Disfruta cada encuentro y registra los resultados correspondientes.",
  },
  {
    tab: "Avanza",
    title: "Avanza.",
    text: "Consulta la tabla de posiciones, tu historial y el ranking actualizado de la competencia.",
  },
  {
    tab: "Conecta",
    title: "Conecta.",
    text: "Descubre nuevos rivales y forma parte de una comunidad que comparte tu pasión por el pádel.",
  },
];

const STAGE_COUNT = STAGES.length;

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
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Pasos de la plataforma APT"
    >
      {STAGES.map((s, i) => (
        <button
          key={s.tab}
          type="button"
          role="tab"
          onClick={() => onSelect(i)}
          aria-selected={i === stage}
          aria-controls="plataforma-stage-panel"
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

function StageCopy({ stage }: { stage: number }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        id="plataforma-stage-panel"
        role="tabpanel"
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: EASE_SECONDARY }}
        className="mt-5"
      >
        <p className="font-display text-sm font-bold text-turquoise">
          {String(stage + 1).padStart(2, "0")} / {String(STAGE_COUNT).padStart(2, "0")}
        </p>
        <h2 className="font-display mt-2 text-[length:var(--heading-sm)] font-bold uppercase leading-[1.05] text-white">
          {STAGES[stage].title}
        </h2>
        <p className="mt-3 max-w-md text-[length:var(--text-body)] leading-relaxed text-white/65">
          {STAGES[stage].text}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export function RivieraCinematic() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [mobileStage, setMobileStage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
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
      if (cancelled || !wrapperRef.current || !pinRef.current) return;

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
                scrub: 0.7,
                pin: pinRef.current,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  setStage(
                    Math.min(STAGE_COUNT - 1, Math.floor(self.progress * STAGE_COUNT)),
                  );
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
            requestAnimationFrame(() => ScrollTrigger.refresh());

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
    setStage(i);
    const st = triggerRef.current;
    if (st) {
      const target =
        st.start + ((i + 0.5) / STAGE_COUNT) * (st.end - st.start);
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <section
      id="tecnologia"
      className="riviera-section relative scroll-mt-20 overflow-x-clip bg-navy-deep"
    >
      <div ref={wrapperRef} className="hidden w-full lg:block">
        <div ref={pinRef} className="riviera-pin">
          <div className="apt-container">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Tecnología para competir mejor
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-[length:var(--heading-sm)] font-bold uppercase leading-[1.05] text-white">
              Toda tu competencia en un mismo lugar
            </h2>
            <p className="mt-3 max-w-xl text-[length:var(--text-body)] leading-relaxed text-white/65">
              Nuestra plataforma digital facilita el seguimiento de cada evento
              y permite que los jugadores tengan acceso a la información más
              importante de su participación.
            </p>

            <div className="riviera-stage mt-6">
              <div className="min-w-0">
                <StageControls stage={stage} onSelect={goToStage} />
                <StageCopy stage={stage} />
              </div>

              <div className="riviera-visual-frame">
                <RivieraScene
                  stage={stage}
                  ballRef={ballRef}
                  trajectoryRef={trajectoryRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="riviera-viewport flex w-full flex-col items-center justify-center lg:hidden">
        <div className="apt-container w-full">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
            Tecnología para competir mejor
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[length:var(--heading-sm)] font-bold uppercase leading-[1.05] text-white">
            Toda tu competencia en un mismo lugar
          </h2>
          <p className="mt-3 max-w-xl text-[length:var(--text-body)] leading-relaxed text-white/65">
            Nuestra plataforma digital facilita el seguimiento de cada evento y
            permite que los jugadores tengan acceso a la información más
            importante de su participación.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            <StageControls stage={mobileStage} onSelect={setMobileStage} />
            <div className="riviera-visual-frame">
              <RivieraVisual stage={mobileStage} />
            </div>
            <StageCopy stage={mobileStage} />
          </div>
        </div>
      </div>
    </section>
  );
}
