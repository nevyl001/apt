import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import type { CommunityEvent, EventFormat, EventStatus } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const FORMAT_LABEL: Record<EventFormat, string> = {
  reta: "Reta",
  torneo: "Torneo",
  liga: "Liga",
  americano: "Americano",
  duelo_2v2: "Duelo 2v2",
  especial: "Especial",
};

const STATUS_CONFIG: Record<EventStatus, { label: string; className: string }> = {
  upcoming: { label: "Próximamente", className: "bg-navy/8 text-navy" },
  open: { label: "Inscripciones abiertas", className: "bg-lime/15 text-navy" },
  full: { label: "Cupo lleno", className: "bg-ink/8 text-muted" },
  in_progress: { label: "En curso", className: "bg-turquoise/15 text-turquoise" },
  completed: { label: "Finalizado", className: "bg-ink/5 text-muted" },
};

export function EventCard({
  event,
  featured = false,
}: {
  event: CommunityEvent;
  featured?: boolean;
}) {
  const status = STATUS_CONFIG[event.status];

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className={cn(
        "group flex min-w-[280px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-[0_16px_40px_-20px_rgba(0,43,107,0.35)] sm:min-w-0",
        featured && "sm:col-span-2 sm:row-span-2 sm:p-8",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-turquoise">
          {FORMAT_LABEL[event.format]}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-medium",
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      <h3
        className={cn(
          "font-display mt-4 font-bold leading-tight text-navy-deep transition-colors group-hover:text-navy",
          featured ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        {event.title}
      </h3>

      <div className="mt-5 space-y-2.5 text-sm text-muted">
        <div className="flex items-center gap-2.5">
          <CalendarDays aria-hidden className="size-4 text-turquoise" />
          {formatEventDate(event.startsAt)}
          <span className="text-border">·</span>
          <Clock aria-hidden className="size-4 text-turquoise" />
          {formatEventTime(event.startsAt)}
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin aria-hidden className="size-4 text-turquoise" />
          {event.venue}
        </div>
        {event.availableSlots !== undefined && (
          <div className="flex items-center gap-2.5">
            <Users aria-hidden className="size-4 text-turquoise" />
            {event.availableSlots} lugares disponibles
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {event.categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-border px-3 py-1 text-xs text-ink/70"
          >
            {category}
          </span>
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
        Ver detalles
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
