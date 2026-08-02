import Link from "next/link";
import { AtSign, MessageCircle, Mail } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/ranking", label: "Ranking" },
  { href: "/resultados", label: "Resultados" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/riviera-app", label: "Riviera App" },
];

const LEGAL_ITEMS = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos" },
];

export function AptFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="apt-container grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr] lg:py-20">
        <div>
          <AptLogo onDark height={40} />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            Torneos, retas y ligas de pádel en Acapulco. Comunidad conectada
            al ecosistema Riviera Open.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="#"
              aria-label="APT en Instagram"
              className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-turquoise hover:text-turquoise"
            >
              <AtSign className="size-4" />
            </Link>
            <Link
              href="#"
              aria-label="APT en Facebook"
              className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-turquoise hover:text-turquoise"
            >
              <MessageCircle className="size-4" />
            </Link>
            <Link
              href="mailto:contacto@acapulcopadeltour.com"
              aria-label="Escribir a APT"
              className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-turquoise hover:text-turquoise"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
            Navegación
          </p>
          <ul className="mt-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
            Legal
          </p>
          <ul className="mt-4 space-y-3">
            {LEGAL_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/70">
            Acapulco, Guerrero, México
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="apt-container flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} APT — Acapulco Padel Tour.</p>
          <p>
            Tecnología conectada por Riviera App · Comunidad integrada al
            ecosistema Riviera Open
          </p>
        </div>
      </div>
    </footer>
  );
}
