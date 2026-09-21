/**
 * Enlaces y contacto de APT.
 *
 * WhatsApp solo se expone cuando existe un número oficial real.
 * Mientras WHATSAPP_PHONE sea null, ningún CTA de WhatsApp debe renderizarse.
 * No inventar teléfonos, URLs ni redes.
 */
const WHATSAPP_BASE_URL = "https://wa.me/";

/** Número oficial de APT. null = aún no confirmado → no mostrar CTAs de WhatsApp. */
export const WHATSAPP_PHONE: string | null = null;

export const WHATSAPP_MESSAGE_GENERAL =
  "Hola, quiero formar parte de Acapulco Padel Tour y conocer sus próximas ligas, torneos y formatos de competencia.";

export const WHATSAPP_MESSAGE_LIGA =
  "Hola, quiero recibir información sobre la primera Liga Acapulco Padel Tour. ¿Me pueden compartir las categorías, fechas y proceso de inscripción?";

function buildWhatsAppUrl(phone: string, message: string): string {
  return `${WHATSAPP_BASE_URL}${phone}?text=${encodeURIComponent(message)}`;
}

/** URL de WhatsApp general, o null si no hay número oficial. */
export function getWhatsAppGeneralUrl(): string | null {
  if (!WHATSAPP_PHONE) return null;
  return buildWhatsAppUrl(WHATSAPP_PHONE, WHATSAPP_MESSAGE_GENERAL);
}

/** URL de WhatsApp para la Liga APT, o null si no hay número oficial. */
export function getWhatsAppLigaUrl(): string | null {
  if (!WHATSAPP_PHONE) return null;
  return buildWhatsAppUrl(WHATSAPP_PHONE, WHATSAPP_MESSAGE_LIGA);
}

/** Instagram oficial. null = aún no confirmado. */
export const instagram: string | null = null;
