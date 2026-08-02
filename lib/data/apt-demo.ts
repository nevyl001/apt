/**
 * DATOS DEMO — APT · Acapulco Padel Tour
 * -----------------------------------------------------------------------
 * Este archivo es la ÚNICA fuente de datos ficticios del proyecto.
 * Ningún componente debe declarar datos inventados directamente: todo
 * pasa por las funciones de /lib/data/index.ts, que hoy leen de aquí y
 * mañana pueden leer de Supabase / la API de Riviera sin tocar la UI.
 *
 * Nada de lo que aparece en este archivo debe presentarse como una cifra
 * real. Los componentes que consumen `null` deben mostrar un estado
 * "Próximamente".
 */
import type {
  Community,
  CommunityEvent,
  CommunityStat,
  PlayerProfile,
  PlayerRanking,
  MatchResult,
} from "@/lib/types";

export const demoCommunity: Community = {
  id: "apt-acapulco",
  name: "APT — Acapulco Padel Tour",
  slug: "apt-acapulco",
  logoUrl: "/brand/apt-logo.png",
  city: "Acapulco",
  state: "Guerrero",
  rivieraCommunityId: "riviera-comm-apt-acapulco",
};

export const demoStats: CommunityStat[] = [
  { id: "players", label: "Jugadores registrados", value: null },
  { id: "matches", label: "Partidos disputados", value: null },
  { id: "events", label: "Eventos organizados", value: null },
  { id: "communities", label: "Comunidades conectadas", value: null },
  { id: "ranking", label: "Ranking actualizado", value: null, suffix: "" },
];

export const demoEvents: CommunityEvent[] = [
  {
    id: "evt-1",
    slug: "reta-miercoles-de-oleaje",
    title: "Reta de Miércoles: Oleaje Nocturno",
    format: "reta",
    startsAt: "2026-08-06T19:30:00-06:00",
    venue: "Club Náutico Acapulco",
    categories: ["Mixto B", "Mixto C"],
    status: "open",
    availableSlots: 6,
  },
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
    id: "evt-3",
    slug: "liga-apt-temporada-3",
    title: "Liga APT — Temporada 3",
    format: "liga",
    startsAt: "2026-08-20T18:00:00-06:00",
    venue: "Sedes rotativas APT",
    categories: ["Libre", "Femenil"],
    status: "upcoming",
  },
  {
    id: "evt-4",
    slug: "americano-diamante",
    title: "Americano Diamante",
    format: "americano",
    startsAt: "2026-08-09T17:00:00-06:00",
    venue: "Diamante Padel Club",
    categories: ["Mixto A/B"],
    status: "full",
  },
  {
    id: "evt-5",
    slug: "duelo-2v2-caleta",
    title: "Duelo 2v2 · Caleta",
    format: "duelo_2v2",
    startsAt: "2026-08-12T20:00:00-06:00",
    venue: "Arena Caleta",
    categories: ["Varonil Open"],
    status: "open",
    availableSlots: 2,
  },
];

export const demoRankingApt: PlayerRanking[] = [
  {
    playerId: "p1",
    rivieraId: "RIV-4471",
    name: "Diego Marín",
    category: "1ra Fuerza",
    position: 1,
    previousPosition: 1,
    points: 1280,
    rating: 4.8,
    matchesPlayed: 22,
    communityName: "APT — Acapulco Padel Tour",
  },
  {
    playerId: "p2",
    rivieraId: "RIV-3390",
    name: "Renata Cobos",
    category: "1ra Fuerza",
    position: 2,
    previousPosition: 3,
    points: 1195,
    rating: 4.7,
    matchesPlayed: 19,
    communityName: "APT — Acapulco Padel Tour",
  },
  {
    playerId: "p3",
    rivieraId: "RIV-5518",
    name: "Iker Salcedo",
    category: "2da Fuerza",
    position: 3,
    previousPosition: 2,
    points: 1140,
    rating: 4.6,
    matchesPlayed: 24,
    communityName: "APT — Acapulco Padel Tour",
  },
  {
    playerId: "p4",
    rivieraId: "RIV-2207",
    name: "Camila Reséndiz",
    category: "Femenil",
    position: 4,
    previousPosition: 4,
    points: 1080,
    rating: 4.5,
    matchesPlayed: 18,
    communityName: "APT — Acapulco Padel Tour",
  },
  {
    playerId: "p5",
    rivieraId: "RIV-6602",
    name: "Bruno Zamudio",
    category: "2da Fuerza",
    position: 5,
    previousPosition: 7,
    points: 1035,
    rating: 4.4,
    matchesPlayed: 20,
    communityName: "APT — Acapulco Padel Tour",
  },
];

export const demoRankingNational: PlayerRanking[] = demoRankingApt.map((p, i) => ({
  ...p,
  position: i + 12,
  previousPosition: (p.previousPosition ?? p.position) + 12,
}));

export const demoResults: MatchResult[] = [
  {
    id: "res-1",
    eventName: "Reta de Miércoles",
    date: "2026-07-30",
    category: "Mixto B",
    players: ["Marín / Cobos", "Salcedo / Reséndiz"],
    score: "6-4, 6-3",
  },
  {
    id: "res-2",
    eventName: "Americano Diamante",
    date: "2026-07-26",
    category: "Mixto A/B",
    players: ["Zamudio / Torres", "Cobos / Salcedo"],
    score: "6-2, 4-6, 7-5",
  },
];

export const demoPlayerProfile: PlayerProfile = {
  playerId: "p1",
  rivieraId: "RIV-4471",
  name: "Diego Marín",
  community: "APT — Acapulco Padel Tour",
  category: "1ra Fuerza",
  dominantHand: "derecha",
  side: "drive",
  matchesPlayed: 22,
  eventsPlayed: 9,
  points: 1280,
  rating: 4.8,
  localPosition: 1,
  nationalPosition: 13,
  recentForm: ["W", "W", "L", "W", "W"],
};
