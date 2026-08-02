"use client";

import { motion } from "motion/react";
import type { CommunityEvent } from "@/lib/types";
import { SectionHeading } from "@/components/apt/SectionHeading";
import { EventCard } from "@/components/events/EventCard";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";
import { DURATION, EASE_SECONDARY, STAGGER, TRANSLATE_MAX } from "@/lib/motion/tokens";

export function EventsSection({ events }: { events: CommunityEvent[] }) {
  const reduced = useReducedMotion();

  return (
    <section id="eventos" className="apt-section apt-section--sm scroll-mt-20">
      <div className="apt-container">
        <SectionHeading
          eyebrow="Agenda APT"
          title="Próximos eventos"
          description="Torneos y ligas diseñados para vivir la competencia dentro de APT."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={reduced ? undefined : { opacity: 0, y: TRANSLATE_MAX * 0.6 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              whileHover={reduced ? undefined : { y: -6 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: DURATION.reveal, delay: i * STAGGER.max, ease: EASE_SECONDARY }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
