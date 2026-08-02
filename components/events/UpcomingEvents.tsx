"use client";

import { useMemo, useState } from "react";
import type { CommunityEvent } from "@/lib/types";
import { SectionHeading } from "@/components/apt/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EventCard } from "@/components/events/EventCard";
import { EventFilters, type EventFilterValue } from "@/components/events/EventFilters";

const OTROS_FORMATS: CommunityEvent["format"][] = [
  "americano",
  "duelo_2v2",
  "especial",
];

export function UpcomingEvents({ events }: { events: CommunityEvent[] }) {
  const [filter, setFilter] = useState<EventFilterValue>("todos");

  const filtered = useMemo(() => {
    if (filter === "todos") return events;
    if (filter === "otros") {
      return events.filter((e) => OTROS_FORMATS.includes(e.format));
    }
    return events.filter((e) => e.format === filter);
  }, [events, filter]);

  return (
    <section className="apt-container py-20 lg:py-28">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Agenda APT" title="LO PRÓXIMO EN APT" />
        <EventFilters active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center text-muted">
          No hay eventos de este tipo por ahora. Vuelve pronto.
        </p>
      ) : (
        <div className="apt-scroll-x mt-12 flex snap-x gap-5 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} featured={i === 0} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <MagneticButton href="/eventos" variant="outline">
          Ver todos los eventos
        </MagneticButton>
      </div>
    </section>
  );
}
