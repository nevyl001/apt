import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function RankingMovement({
  position,
  previousPosition,
}: {
  position: number;
  previousPosition?: number;
}) {
  if (previousPosition === undefined || previousPosition === position) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted">
        <Minus aria-hidden className="size-3" />
        <span className="sr-only">Sin cambio</span>
      </span>
    );
  }

  const improved = previousPosition > position;
  const delta = Math.abs(previousPosition - position);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        improved ? "bg-lime/20 text-navy" : "bg-ink/5 text-muted",
      )}
    >
      {improved ? (
        <ArrowUp aria-hidden className="size-3" />
      ) : (
        <ArrowDown aria-hidden className="size-3" />
      )}
      {delta}
    </span>
  );
}
