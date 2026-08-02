/**
 * Capa de datos desacoplada de APT.
 *
 * Todas las secciones del sitio consumen datos exclusivamente a través de
 * estas funciones. Hoy resuelven contra /lib/data/apt-demo.ts; el día que
 * exista integración real con Riviera App (vía Supabase o la API de
 * Riviera, ver /lib/riviera/client.ts) solo hay que reescribir el cuerpo
 * de estas funciones — ningún componente necesita cambiar.
 */
import "server-only";
import type {
  Community,
  CommunityEvent,
  CommunityStat,
  MatchResult,
  PlayerProfile,
  PlayerRanking,
} from "@/lib/types";
import {
  demoCommunity,
  demoEvents,
  demoPlayerProfile,
  demoRankingApt,
  demoRankingNational,
  demoResults,
  demoStats,
} from "@/lib/data/apt-demo";

export async function getCommunity(): Promise<Community> {
  return demoCommunity;
}

export async function getCommunityStats(): Promise<CommunityStat[]> {
  return demoStats;
}

export async function getUpcomingEvents(): Promise<CommunityEvent[]> {
  return [...demoEvents].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}

export async function getCommunityRanking(): Promise<PlayerRanking[]> {
  return demoRankingApt;
}

export async function getNationalRankingPreview(): Promise<PlayerRanking[]> {
  return demoRankingNational;
}

export async function getRecentResults(): Promise<MatchResult[]> {
  return demoResults;
}

export async function getPlayerProfile(
  rivieraId: string,
): Promise<PlayerProfile | null> {
  return demoPlayerProfile.rivieraId === rivieraId ? demoPlayerProfile : null;
}
