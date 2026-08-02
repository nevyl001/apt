import { MotionTrajectory } from "@/components/motion/MotionTrajectory";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";

export function CommunityCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div className="apt-grain" />
      <MotionTrajectory
        className="pointer-events-none absolute -bottom-4 left-0 opacity-60"
        color="rgba(255,255,255,0.25)"
      />

      <div className="apt-container relative text-center">
        <RevealText
          as="h2"
          splitBy="word"
          className="font-display mx-auto max-w-2xl text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-5xl"
        >
          ¿YA JUEGAS EN APT?
        </RevealText>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
          Regístrate con tu comunidad, participa en sus eventos y empieza a
          construir tu historial dentro de Riviera Open.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/eventos" variant="lime">
            Consultar próximos eventos
          </MagneticButton>
          <MagneticButton href="/ranking" variant="outline-light">
            Buscar mi ranking
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
