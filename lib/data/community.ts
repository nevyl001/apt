/**
 * Datos de la comunidad APT — editar directamente para mantener el sitio.
 * Sin base de datos, sin CMS: este archivo es la fuente de verdad.
 */
import type { Community } from "@/lib/types";

export const community: Community = {
  id: "apt-acapulco",
  name: "APT — Acapulco Padel Tour",
  slug: "apt-acapulco",
  logoUrl: "/brand/apt-logo.png",
  city: "Acapulco",
  state: "Guerrero",
  rivieraCommunityId: "PENDIENTE", // TODO: ID real de la comunidad en Riviera Open
};

export const aboutParagraphs: string[] = [
  "APT — Acapulco Padel Tour nace para crear una experiencia de competencia mejor organizada, cercana y con mayor valor para cada jugador.",
  "Gestionamos nuestras competencias mediante Riviera App para registrar resultados, ranking e historial, y conectar a nuestros jugadores con el ecosistema nacional Riviera Open.",
];

export interface CompetitionFormat {
  /** Identificador estable — también se usa para elegir la escena visual. */
  id: string;
  name: string;
  /** Una línea, mostrada solo bajo la fila activa de la lista. */
  descriptor: string;
  /** Frase corta mostrada dentro del panel visual — distinta del descriptor. */
  tagline: string;
  /** Máximo tres, mostrados como texto separado por "·" dentro del panel. */
  attributes: [string, string, string];
}

/**
 * Dinámicas que APT puede organizar, mostradas solo de forma informativa.
 * Retas abre la lista a propósito: es el formato más fácil de entender y
 * la entrada natural a la sección.
 */
export const competitionFormats: CompetitionFormat[] = [
  {
    id: "retas",
    name: "Retas",
    descriptor: "Encuentros libres, sin cuadro",
    tagline: "Partidos flexibles para competir y registrar resultados.",
    attributes: ["Flexible", "Frecuente", "Ranking"],
  },
  {
    id: "americano",
    name: "Americano",
    descriptor: "Rotación de parejas, puntos individuales",
    tagline: "Cambias de pareja en cada ronda y sumas puntos propios.",
    attributes: ["Rotación", "Individual", "Dinámico"],
  },
  {
    id: "duelo",
    name: "Duelo 2 vs 2",
    descriptor: "Enfrentamiento directo entre parejas",
    tagline: "Dos parejas fijas, un resultado directo.",
    attributes: ["Parejas fijas", "Directo", "Inmediato"],
  },
  {
    id: "torneo-express",
    name: "Torneo Express",
    descriptor: "Una jornada, grupos y final",
    tagline: "Grupos rápidos con una final el mismo día.",
    attributes: ["Una jornada", "Grupos", "Ritmo rápido"],
  },
  {
    id: "ligas",
    name: "Ligas",
    descriptor: "Temporada con tabla general",
    tagline: "Jornadas programadas y una tabla que avanza contigo.",
    attributes: ["Temporada", "Tabla", "Constancia"],
  },
  {
    id: "torneos",
    name: "Torneos",
    descriptor: "Categorías y cuadro eliminatorio",
    tagline: "Categorías y fases con un camino directo a la final.",
    attributes: ["Categorías", "Eliminación", "Campeones"],
  },
];
