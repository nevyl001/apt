import { MapPin } from "lucide-react";
import type { CommunityEvent, EventFormat, EventStatus } from "@/lib/types";
import { formatEventDayMonth } from "@/lib/utils/format";
import { whatsappEvents } from "@/lib/data/links";

const FORMAT_LABEL: Record<EventFormat, string> = {
  torneo: "Torneo",
  liga: "Liga",
};

const FORMAT_ACCENT: Record<EventFormat, string> = {
  torneo: "bg-turquoise",
  liga: "bg-lime",
};

const STATUS_CONFIG: Record<EventStatus, { label: string; className: string }> = {
  upcoming: { label: "Próximamente", className: "bg-navy/8 text-navy" },
  open: { label: "Inscripciones abiertas", className: "bg-lime/20 text-navy" },
  full: { label: "Cupo lleno", className: "bg-ink/8 text-muted" },
  in_progress: { label: "En curso", className: "bg-turquoise/15 text-turquoise" },
  completed: { label: "Finalizado", className: "bg-ink/5 text-muted" },
};

export function EventCard({ event }: { event: CommunityEvent }) {
  const status = STATUS_CONFIG[event.status];
  const { day, month } = formatEventDayMonth(event.startsAt);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:border-transparent hover:shadow-[0_28px_60px_-28px_rgba(0,43,107,0.32)]">
      <div className={`h-1 w-full ${FORMAT_ACCENT[event.format]}`} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold leading-none text-navy-deep">
              {day}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-turquoise">
              {month}
            </span>
          </div>
          <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${status.className}`}>
            {status.label}
          </span>
        </div>

        <span className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          {FORMAT_LABEL[event.format]}
        </span>
        <h3 className="font-display mt-1.5 text-xl font-bold leading-tight text-navy-deep">
          {event.title}
        </h3>

        <div className="mt-4 flex items-center gap-2.5 text-sm text-muted">
          <MapPin aria-hidden className="size-4 text-turquoise" />
          {event.venue}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border px-3 py-1 text-xs text-ink/70"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <a
            href={whatsappEvents(event.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-lime px-5 py-3 text-sm font-medium text-navy-deep transition-colors hover:bg-lime/90"
          >
            Quiero inscribirme
          </a>
        </div>
      </div>
    </div>
  );
}
