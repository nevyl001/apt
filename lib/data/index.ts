/**
 * Capa de datos de APT. Todas las secciones del sitio consumen datos
 * exclusivamente a través de estas funciones, que hoy leen de
 * community.ts / events.ts / sponsors.ts. El día que exista integración
 * real con Riviera App solo hay que reescribir el cuerpo de estas
 * funciones — ningún componente necesita cambiar.
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
