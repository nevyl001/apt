/**
 * Agenda pública de APT — DATOS DE EJEMPLO.
 * Edita este arreglo para publicar los torneos y ligas reales.
 * Solo van aquí eventos con fecha real a los que alguien pueda
 * inscribirse (torneo | liga). Otras dinámicas de juego (retas,
 * americanos, duelos) se explican de forma informativa en
 * "competitionFormats" dentro de community.ts, no como eventos agendados.
 */
import type { CommunityEvent } from "@/lib/types";

export const events: CommunityEvent[] = [
  {
    id: "evt-2",
    slug: "torneo-apertura-costa-azul",
    title: "Torneo Apertura Costa Azul",
    format: "torneo",
    startsAt: "2026-08-15T09:00:00-06:00",
    venue: "Costa Azul Padel Center",
    categories: ["1ra Fuerza", "2da Fuerza", "3ra Fuerza"],
    status: "open",
    availableSlots: 4,
  },
  {
    id: "evt-6",
    slug: "torneo-bicentenario",
    title: "Torneo Bicentenario",
    format: "torneo",
    startsAt: "2026-08-28T09:00:00-06:00",
    venue: "Diamante Padel Club",
    categories: ["1ra Fuerza", "Libre"],
    status: "upcoming",
  },
  {
    id: "evt-3",
    slug: "liga-apt-temporada-3",
    title: "Liga APT — Temporada 3",
    format: "liga",
    startsAt: "2026-08-20T18:00:00-06:00",
    venue: "Sedes rotativas APT",
    categories: ["Libre", "Femenil"],
    status: "upcoming",
  },
];
