/**
 * Contacto oficial de APT, tomado de los datos confirmados.
 * Los CTA de informes abren WhatsApp, Instagram o Maps directamente.
 */
const WHATSAPP_BASE_URL = "https://wa.me/";

export const WHATSAPP_MESSAGE_GENERAL =
  "Hola, quiero formar parte de Acapulco Padel Tour y conocer sus próximas ligas, torneos y formatos de competencia.";

export const WHATSAPP_MESSAGE_LIGA =
  "Hola, quiero recibir información sobre la primera Liga Acapulco Padel Tour. ¿Me pueden compartir las categorías, fechas y proceso de inscripción?";

/** Número que usan los botones principales de informes. */
export const WHATSAPP_PHONE = "527444630755";

export const WHATSAPP_NUMBERS = [
  { display: "55 6055 3119", phone: "525560553119" },
  { display: "744 253 4490", phone: "527442534490" },
  { display: "744 463 0755", phone: "527444630755" },
] as const;

export const INSTAGRAMS = [
  {
    handle: "acapulcopadeltour",
    label: "Acapulco Padel Tour",
    url: "https://www.instagram.com/acapulcopadeltour",
  },
  {
    handle: "lozadapadelacademy",
    label: "Lozada Academy",
    url: "https://www.instagram.com/lozadapadelacademy",
  },
] as const;

export const VENUE = {
  name: "La Curva Pádel Club",
  address: "Lomas del Mar 689, Fracc. Club Deportivo, Acapulco.",
} as const;

function buildWhatsAppUrl(phone: string, message: string): string {
  return `${WHATSAPP_BASE_URL}${phone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppUrl(phone: string, message: string): string {
  return buildWhatsAppUrl(phone, message);
}

export function getWhatsAppGeneralUrl(phone: string = WHATSAPP_PHONE): string {
  return buildWhatsAppUrl(phone, WHATSAPP_MESSAGE_GENERAL);
}

export function getWhatsAppLigaUrl(phone: string = WHATSAPP_PHONE): string {
  return buildWhatsAppUrl(phone, WHATSAPP_MESSAGE_LIGA);
}

export function getMapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${VENUE.name}, ${VENUE.address}`,
  )}`;
}
