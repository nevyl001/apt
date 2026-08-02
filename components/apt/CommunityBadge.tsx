import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function CommunityBadge({
  className,
  label = "Comunidad conectada a Riviera Open",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm",
        className,
      )}
    >
      <Link2 aria-hidden className="size-3.5 text-lime" />
      {label}
    </span>
  );
}
