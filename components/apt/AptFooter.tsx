import Link from "next/link";
import { MessageCircle, AtSign } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";
import { instagram, rivieraOpen, whatsappGeneral } from "@/lib/data/links";

export function AptFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white">
      <div className="apt-container flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:py-10">
        <div className="flex items-center gap-4">
          <AptLogo variant="footer" onDark />
          <div>
            <p className="font-display text-sm font-bold text-white">
              APT — Acapulco Padel Tour
            </p>
            <p className="text-xs text-white/50">Acapulco, Guerrero</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
          <a
            href="#riviera-app"
            className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
          >
            Riviera App
          </a>
          <a
            href={rivieraOpen}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir al sitio oficial de Riviera Open"
            className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
          >
            Riviera Open
          </a>
          {instagram && (
            <Link
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="APT en Instagram"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              <AtSign className="size-4" />
            </Link>
          )}
          <Link
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a APT por WhatsApp"
            className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
