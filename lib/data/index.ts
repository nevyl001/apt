/**
 * Capa de datos de APT. Las secciones consumen datos a través de estas
 * funciones. Hoy leen de community.ts / events.ts / sponsors.ts.
 */
import "server-only";
import type { Community, CommunityEvent, Sponsor } from "@/lib/types";
import { community } from "@/lib/data/community";
import { events } from "@/lib/data/events";
import { sponsors } from "@/lib/data/sponsors";

export async function getCommunity(): Promise<Community> {
  return community;
}

export async function getUpcomingEvents(): Promise<CommunityEvent[]> {
  return [...events].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}

export async function getSponsors(): Promise<Sponsor[]> {
  return sponsors;
}
