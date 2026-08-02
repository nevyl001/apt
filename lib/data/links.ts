/**
 * Enlaces externos centralizados — único lugar que se debe editar para
 * actualizar el contacto de WhatsApp y los enlaces a Riviera App /
 * Riviera Open en todo el sitio.
 *
 * Los valores en `null` son enlaces PENDIENTES: APT todavía no tiene esa
 * URL definitiva. Ningún componente debe renderizar un enlace roto ("#")
 * para estos casos — el sistema de botones (MagneticButton) oculta el CTA
 * o lo muestra deshabilitado como "Disponible próximamente" cuando el
 * valor es null. En cuanto exista la URL real, solo hay que reemplazarla
 * aquí.
 */
const WHATSAPP_PHONE = "527441234567"; // TODO: número real de APT
const WHATSAPP_BASE_URL = "https://wa.me/";

function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** CTA "Unirme a APT" — navbar, hero y CTA final usan siempre el mismo mensaje. */
export const whatsappCommunity = buildWhatsAppUrl(
  "Hola, quiero formar parte de APT — Acapulco Padel Tour. ¿Me comparten información?",
);

/** CTA de cada tarjeta de evento — el nombre del evento se inserta en el mensaje. */
export function whatsappEvents(eventTitle: string): string {
  return buildWhatsAppUrl(
    `Hola, me interesa inscribirme al ${eventTitle} de APT. ¿Me comparten información?`,
  );
}

export const whatsappGeneral = buildWhatsAppUrl(
  "Hola, quiero más información sobre APT — Acapulco Padel Tour.",
);

// TODO: reemplazar por las URLs reales en cuanto APT tenga su cuenta activa en Riviera.
export const rivieraApp: string | null = null;
export const aptRanking: string | null = null;
export const nationalRanking: string | null = null;
export const instagram: string | null = null; // TODO: perfil real de Instagram
