"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { getWhatsAppGeneralUrl } from "@/lib/data/links";
import { motionTokens } from "@/lib/motion/tokens";

const TRAIL_D =
  "M 40 520 C 280 460, 520 340, 800 280 C 940 250, 1000 260, 1050 260 C 1160 260, 1240 290, 1300 320";

const BALL_KEYFRAMES = {
  cx: [40, 460, 800, 1050, 1300],
  cy: [520, 400, 280, 255, 320],
};

export function FinalCTA() {
  const reduced = useReducedMotion();
  const whatsappGeneral = getWhatsAppGeneralUrl();

  return (
    <section
      id="contacto"
      className="final-cta-section scroll-mt-20 bg-navy"
    >
      <div className="apt-grain" />

      <svg
        aria-hidden
        viewBox="0 0 1600 700"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      >
        <polygon
          points="120,660 1480,660 1260,120 340,120"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1.2}
        />
        <line x1="800" y1="130" x2="800" y2="650" stroke="var(--apt-turquoise)" strokeOpacity={0.1} strokeWidth={1.5} />
        <line x1="340" y1="390" x2="1260" y2="390" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />

        <circle cx="230" cy="560" r="2.5" fill="var(--apt-white)" opacity={0.25} />
        <circle cx="1370" cy="230" r="2.5" fill="var(--apt-turquoise)" opacity={0.3} />
        <circle cx="960" cy="560" r="2" fill="var(--apt-white)" opacity={0.2} />

        <motion.path
          d={TRAIL_D}
          fill="none"
          stroke="var(--apt-turquoise)"
          strokeWidth={1.5}
          initial={reduced ? undefined : { pathLength: 0, opacity: 0.6 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 0.28 }}
          animate={reduced ? { pathLength: 1, opacity: 0.28 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionTokens.scene, ease: motionTokens.easePremium }}
        />

        {reduced ? (
          <circle cx={1300} cy={320} r={7} fill="var(--apt-lime)" />
        ) : (
          <motion.circle
            r={7}
            fill="var(--apt-lime)"
            initial={{ cx: BALL_KEYFRAMES.cx[0], cy: BALL_KEYFRAMES.cy[0], opacity: 0 }}
            whileInView={{ cx: BALL_KEYFRAMES.cx, cy: BALL_KEYFRAMES.cy, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: motionTokens.scene,
              ease: motionTokens.easePremium,
              opacity: { duration: 0.3 },
            }}
          />
        )}
      </svg>

      <div className="final-cta-inner relative">
        <div className="final-cta-copy">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
            Acapulco Padel Tour
          </p>
          <h2 className="final-cta-title font-display mt-3 font-bold uppercase text-white">
            <RevealText as="span" splitBy="word">
              Tu próximo reto comienza en APT
            </RevealText>
          </h2>
          <p className="mt-5 max-w-md text-[length:var(--text-body)] leading-relaxed text-white/70">
            Compite contra nuevos jugadores, mide tu progreso y forma parte de
            una comunidad creada para hacer crecer el pádel en Acapulco.
          </p>
        </div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionTokens.reveal, delay: 0.15, ease: motionTokens.easePremium }}
          className="flex flex-col items-start gap-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href="#eventos" variant="lime">
              Inscríbete a la Liga APT
            </MagneticButton>
            {whatsappGeneral && (
              <MagneticButton href={whatsappGeneral} variant="outline-light" external>
                Solicita información por WhatsApp
              </MagneticButton>
            )}
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            Acapulco, Guerrero, México
          </p>
        </motion.div>
      </div>
    </section>
  );
}
