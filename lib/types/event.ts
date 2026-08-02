/**
 * Solo los formatos que se publican con fecha en la agenda pública.
 * Retas, americanos, duelos y demás dinámicas internas se explican de
 * forma informativa en la sección "Modalidades" (ver lib/data/community.ts),
 * no como eventos agendados.
 */
export type EventFormat = "torneo" | "liga";

export type EventStatus =
  | "upcoming"
  | "open"
  | "full"
  | "in_progress"
  | "completed";

export interface CommunityEvent {
  id: string;
  slug: string;
  title: string;
  format: EventFormat;
  startsAt: string;
  venue: string;
  categories: string[];
  status: EventStatus;
  availableSlots?: number;
}
