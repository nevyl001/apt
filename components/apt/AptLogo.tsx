import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface AptLogoProps {
  variant?: "navbar" | "footer" | "default";
  /** Solo el footer (fondo oscuro) usa un plato claro; el navbar nunca. */
  onDark?: boolean;
  priority?: boolean;
  className?: string;
}

/** Archivo en public/brand; unoptimized evita caché vieja de next/image. */
const LOGO_SRC = "/brand/apt-logo.png";

/**
 * Relación real del archivo oficial recortado (símbolo AiP + wordmark).
 * No deformar la marca.
 */
const LOGO_RATIO = 946 / 798;

const BASE_HEIGHT: Record<NonNullable<AptLogoProps["variant"]>, number> = {
  navbar: 56,
  footer: 48,
  default: 44,
};

const SIZE_CLASSES: Record<NonNullable<AptLogoProps["variant"]>, string> = {
  navbar: "h-10 w-auto sm:h-12 lg:h-14",
  footer: "h-11 w-auto",
  default: "h-11 w-auto",
};

export function AptLogo({
  variant = "default",
  onDark = false,
  priority = false,
  className,
}: AptLogoProps) {
  const baseHeight = BASE_HEIGHT[variant];
  const baseWidth = Math.round(baseHeight * LOGO_RATIO);

  const image = (
    <Image
      src={LOGO_SRC}
      alt="APT — Acapulco Padel Tour"
      width={baseWidth}
      height={baseHeight}
      priority={priority}
      unoptimized
      sizes="(max-width: 640px) 120px, 168px"
      className={cn("object-contain object-left", SIZE_CLASSES[variant])}
    />
  );

  return (
    <Link
      href="/"
      aria-label="Ir al inicio de APT — Acapulco Padel Tour"
      className={cn(
        "inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise",
        onDark && "rounded-lg bg-white px-3 py-2",
        className,
      )}
    >
      {image}
    </Link>
  );
}
