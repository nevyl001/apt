"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { CommunityBadge } from "@/components/apt/CommunityBadge";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";

const TITLE_WORDS = ["ACAPULCO", "JUEGA", "EN", "GRANDE"];

export function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero=bg]",
        { opacity: 0 },
        { opacity: 1, duration: 1.1 },
      )
        .fromTo(
          "[data-hero=arc]",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
          "-=0.6",
        )
        .fromTo(
          "[data-hero=badge]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero=word]",
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.15",
        )
        .fromTo(
          "[data-hero=fade]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.25",
        )
        .fromTo(
          "[data-hero=baseline]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          "-=0.3",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[92vh] items-end overflow-hidden bg-navy-deep pb-16 pt-32 sm:pb-20 lg:min-h-screen lg:pb-24"
    >
      {/* Fondo editorial abstracto: geometría + grano, sin fotografía de stock */}
      <div
        data-hero="bg"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 0%, #004f83 0%, #002b6b 45%, #06152d 100%)",
        }}
      >
        <div className="apt-grain" />
        {/* Líneas de cancha, muy discretas */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0, transparent 119px, rgba(255,255,255,0.6) 120px)",
          }}
        />
        <svg
          aria-hidden
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            data-hero="arc"
            d="M -50 780 C 400 550, 1100 550, 1650 780"
            fill="none"
            stroke="var(--apt-turquoise)"
            strokeWidth={1.5}
            strokeOpacity={0.35}
            pathLength={1}
            strokeDasharray={1}
          />
        </svg>
      </div>

      <div className="apt-container relative z-10">
        <div
          data-hero="badge"
          className="mb-6 sm:mb-8"
          style={reduced ? undefined : { opacity: 0 }}
        >
          <CommunityBadge />
        </div>

        <h1 className="font-display max-w-4xl text-[13vw] font-bold uppercase leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          {TITLE_WORDS.map((word, i) => (
            <span key={word} className="mr-4 inline-block overflow-hidden align-bottom last:mr-0">
              <span
                data-hero="word"
                className="inline-block will-change-transform"
                style={reduced ? undefined : { opacity: i === 0 ? 1 : undefined }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero="fade"
          className="mt-6 max-w-xl text-lg font-medium text-white/85 sm:text-xl"
          style={reduced ? undefined : { opacity: 0 }}
        >
          Torneos, retas y competencia que ahora forman parte de un
          ecosistema conectado a nivel nacional.
        </p>

        <p
          data-hero="fade"
          className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
          style={reduced ? undefined : { opacity: 0 }}
        >
          APT conserva su identidad y utiliza Riviera App para gestionar
          resultados, historial y ranking de sus jugadores.
        </p>

        <div
          data-hero="fade"
          className="mt-10 flex flex-wrap items-center gap-4"
          style={reduced ? undefined : { opacity: 0 }}
        >
          <MagneticButton href="/eventos" variant="lime">
            Ver próximos eventos
          </MagneticButton>
          <MagneticButton href="/ranking" variant="outline-light">
            Explorar ranking
          </MagneticButton>
        </div>
      </div>

      <div
        data-hero="baseline"
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-turquoise via-lime to-turquoise"
        style={reduced ? undefined : { transform: "scaleX(0)" }}
      />
    </section>
  );
}
