import { MessageCircle } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";
import {
  getMapsUrl,
  getWhatsAppGeneralUrl,
  INSTAGRAMS,
  VENUE,
  WHATSAPP_NUMBERS,
} from "@/lib/data/links";

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const linkClass =
  "inline-flex items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise";

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

        <div className="flex flex-col gap-4 text-sm text-white/60">
          <a href="#eventos" className="w-fit rounded-sm transition-colors hover:text-white">
            Próximos eventos
          </a>

          <div className="flex flex-col gap-2.5">
            {INSTAGRAMS.map((profile) => (
              <a
                key={profile.handle}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.label}
                className={linkClass}
              >
                <InstagramIcon />
                {profile.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {WHATSAPP_NUMBERS.map((contact) => (
              <a
                key={contact.phone}
                href={getWhatsAppGeneralUrl(contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${contact.display}`}
                className={linkClass}
              >
                <MessageCircle aria-hidden className="size-4 shrink-0" />
                {contact.display}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
