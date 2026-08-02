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

const LOGO_SRC = "/brand/apt-logo.png";

/**
 * Relación real del archivo oficial recortado (1010 × 894 px, sin margen
 * exterior): un lockup casi cuadrado (símbolo + "ACAPULCO PADEL TOUR"
 * apilado debajo), no un lockup horizontal ancho. Con la altura de navbar
 * de esta dirección (72–80 px), un ancho de 110–130 px solo es alcanzable
 * deformando el archivo — algo que la marca prohíbe explícitamente. Se
 * prioriza conservar la proporción real y que el símbolo quede legible
 * dentro del navbar; el ancho resultante es menor al target ideal.
 */
const LOGO_RATIO = 1010 / 894;

const BASE_HEIGHT: Record<NonNullable<AptLogoProps["variant"]>, number> = {
  navbar: 60,
  footer: 52,
  default: 44,
};

const SIZE_CLASSES: Record<NonNullable<AptLogoProps["variant"]>, string> = {
  navbar: "h-9 w-auto sm:h-11 lg:h-[60px]",
  footer: "h-12 w-auto",
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
      sizes="(max-width: 640px) 100px, 140px"
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
