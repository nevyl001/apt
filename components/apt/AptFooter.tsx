import { MessageCircle, AtSign, Mail } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";
import {
  getWhatsAppGeneralUrl,
  instagram,
} from "@/lib/data/links";

/** Correo oficial. null = aún no confirmado → no mostrar. */
const CONTACT_EMAIL: string | null = null;

export function AptFooter() {
  const whatsapp = getWhatsAppGeneralUrl();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="apt-container flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:py-10">
        <div className="flex items-center gap-4">
          <AptLogo variant="footer" onDark />
          <div>
            <p className="font-display text-sm font-bold text-white">
              Acapulco Padel Tour
            </p>
            <p className="text-xs text-white/50">
              Competencia, organización y comunidad.
            </p>
            <p className="mt-1 text-xs text-white/40">
              Acapulco, Guerrero, México.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
          <a
            href="#eventos"
            className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
          >
            Próximos eventos
          </a>
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="APT en Instagram"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              <AtSign className="size-4" />
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar a APT por WhatsApp"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
            </a>
          )}
          {CONTACT_EMAIL && (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Correo de APT"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              <Mail className="size-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
