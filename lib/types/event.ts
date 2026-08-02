export type EventFormat =
  | "reta"
  | "torneo"
  | "liga"
  | "americano"
  | "duelo_2v2"
  | "especial";

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
