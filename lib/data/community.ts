/**
 * Datos de la comunidad APT — fuente de verdad del contenido público.
 * Solo información oficial confirmada.
 */
import type { Community } from "@/lib/types";

export const community: Community = {
  id: "apt-acapulco",
  name: "APT — Acapulco Padel Tour",
  slug: "apt-acapulco",
  logoUrl: "/brand/apt-logo.png",
  city: "Acapulco",
  state: "Guerrero",
  rivieraCommunityId: "PENDIENTE",
};

/**
 * Quiénes somos — dos bloques para el layout existente.
 * Agrupa el contenido oficial sin añadir historia, fundador, visión ni pilares.
 */
export const aboutParagraphs: string[] = [
  "Acapulco Padel Tour nace para ofrecer una experiencia de competencia organizada, dinámica y cercana para los jugadores de pádel de nuestra ciudad. Creamos diferentes formatos para que cada persona pueda competir de acuerdo con su nivel, disponibilidad y objetivos: desde retas y americanos hasta ligas y torneos.",
  "Nuestra plataforma nos permite administrar inscripciones, publicar órdenes de juego, programar partidos, registrar resultados y actualizar el ranking de cada competencia. Queremos que los jugadores tengan mayor claridad, mejores experiencias y nuevas oportunidades para competir, conectar con otros jugadores y seguir creciendo dentro de la cancha.",
];

export interface CompetitionFormat {
  /** Identificador estable — también se usa para elegir la escena visual. */
  id: string;
  name: string;
  /** Una línea bajo la fila activa / resumen corto. */
  descriptor: string;
  /** Frase del panel visual — descripción oficial. */
  tagline: string;
  /** Máximo tres atributos derivados solo del contenido oficial. */
  attributes: [string, string, string];
}

/**
 * Formatos oficiales de APT. Sin inventar funcionalidades.
 * 8 Loco no se publica por separado: es pádel americano.
 */
export const competitionFormats: CompetitionFormat[] = [
  {
    id: "retas",
    name: "Retas",
    descriptor: "Nivel similar, nuevos rivales",
    tagline:
      "Partidos programados entre jugadores de nivel similar para competir, conocer nuevos rivales y mantenerse activos.",
    attributes: ["Nivel similar", "Nuevos rivales", "Mantenerse activo"],
  },
  {
    id: "americanos",
    name: "Americanos",
    descriptor: "Cambio de compañero, puntos individuales",
    tagline:
      "Formato dinámico en el que los jugadores cambian de compañero y acumulan puntos de manera individual.",
    attributes: ["Cambio de compañero", "Puntos individuales", "Formato dinámico"],
  },
  {
    id: "duelo",
    name: "Duelo 2 vs. 2",
    descriptor: "Pareja contra pareja",
    tagline:
      "Una pareja contra otra en un enfrentamiento directo. Ideal para crear rivalidades deportivas y poner a prueba el trabajo en equipo.",
    attributes: ["Pareja contra pareja", "Enfrentamiento directo", "Trabajo en equipo"],
  },
  {
    id: "torneo-express",
    name: "Torneos Express",
    descriptor: "Corta duración, alta intensidad",
    tagline:
      "Competencias de corta duración y alta intensidad para vivir toda la emoción de un torneo en una sola jornada o fin de semana.",
    attributes: ["Corta duración", "Alta intensidad", "Una jornada"],
  },
  {
    id: "ligas",
    name: "Ligas",
    descriptor: "Temporadas, tabla y ranking",
    tagline:
      "Competencias por temporadas, con programación de partidos, seguimiento de resultados, tabla de posiciones y ranking.",
    attributes: ["Temporadas", "Tabla de posiciones", "Ranking"],
  },
  {
    id: "torneos",
    name: "Torneos",
    descriptor: "Categorías, grupos y finales",
    tagline:
      "Eventos estructurados por categorías, con fase de grupos, eliminatorias y finales.",
    attributes: ["Categorías", "Fase de grupos", "Finales"],
  },
];
