import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface AptLogoProps {
  className?: string;
  /**
   * El isotipo original es predominantemente azul marino/turquesa: sobre
   * fondos oscuros se apoya en una placa clara para conservar sus colores
   * exactos sin recolorearlo.
   */
  onDark?: boolean;
  height?: number;
}

export function AptLogo({ className, onDark = false, height = 40 }: AptLogoProps) {
  return (
    <Link
      href="/"
      aria-label="APT — Acapulco Padel Tour, ir al inicio"
      className={cn("inline-flex items-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center rounded-xl",
          onDark ? "bg-white/95 px-2.5 py-1.5 shadow-sm" : "",
        )}
      >
        <Image
          src="/brand/apt-logo.png"
          alt="APT — Acapulco Padel Tour"
          width={Math.round(height * (1010 / 894))}
          height={height}
          priority
        />
      </span>
    </Link>
  );
}
