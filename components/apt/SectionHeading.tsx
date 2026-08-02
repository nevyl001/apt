import { cn } from "@/lib/utils/cn";
import { RevealText } from "@/components/motion/RevealText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-[0.2em]",
            onDark ? "text-turquoise" : "text-turquoise",
          )}
        >
          {eyebrow}
        </p>
      )}
      <RevealText
        as="h2"
        splitBy="word"
        className={cn(
          "font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
          onDark ? "text-white" : "text-navy-deep",
        )}
      >
        {title}
      </RevealText>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            onDark ? "text-white/70" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
