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

/** Dinámicas que APT puede organizar, mostradas solo de forma informativa. */
export const competitionFormats: { name: string; description: string }[] = [
  {
    name: "Retas",
    description: "Encuentros casuales y frecuentes para jugar y medirte sin la presión de un cuadro eliminatorio.",
  },
  {
    name: "Americano",
    description: "Formato rotativo: te enfrentas a distintas parejas durante el evento, sumando puntos individuales.",
  },
  {
    name: "Duelo 2v2",
    description: "Enfrentamiento directo entre dos parejas, pensado para retos puntuales entre jugadores de nivel similar.",
  },
  {
    name: "Torneo Express",
    description: "Competencia de formato corto, ideal para una sola jornada concentrada.",
  },
  {
    name: "Ligas",
    description: "Temporada regular con jornadas programadas y una tabla que se actualiza tras cada fecha.",
  },
  {
    name: "Torneos",
    description: "Cuadro eliminatorio clásico, con categorías y fases bien definidas.",
  },
  {
    name: "Formatos especiales",
    description: "Dinámicas propias de APT diseñadas para necesidades específicas de la comunidad.",
  },
];
