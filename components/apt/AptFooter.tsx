import { AptLogo } from "@/components/apt/AptLogo";
import {
  getMapsUrl,
  getWhatsAppGeneralUrl,
  INSTAGRAMS,
  VENUE,
  WHATSAPP_NUMBERS,
} from "@/lib/data/links";

const linkClass =
  "rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise";

export function AptFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="apt-container flex flex-col gap-8 py-8 sm:flex-row sm:items-start sm:justify-between lg:py-10">
        <div className="flex items-center gap-4">
          <AptLogo variant="footer" onDark />
          <div>
            <p className="font-display text-sm font-bold text-white">
              Acapulco Padel Tour
            </p>
            <p className="text-xs text-white/50">
              Competencia, organización y comunidad.
            </p>
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block max-w-xs text-xs leading-relaxed text-white/70 hover:text-white"
            >
              {VENUE.name}
              <span className="mt-0.5 block text-white/45">{VENUE.address}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/60">
          <a href="#eventos" className={linkClass}>
            Próximos eventos
          </a>
          {INSTAGRAMS.map((profile) => (
            <a
              key={profile.handle}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Instagram @{profile.handle}
            </a>
          ))}
          {WHATSAPP_NUMBERS.map((contact) => (
            <a
              key={contact.phone}
              href={getWhatsAppGeneralUrl(contact.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              WhatsApp {contact.display}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
