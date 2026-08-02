import type { PlayerRanking } from "@/lib/types";
import { RankingMovement } from "@/components/ranking/RankingMovement";
import { cn } from "@/lib/utils/cn";

export function RankingRow({
  player,
  highlight = false,
}: {
  player: PlayerRanking;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200 hover:bg-surface sm:grid-cols-[2.5rem_1.6fr_0.8fr_0.6fr_0.6fr_auto]",
        highlight && "bg-surface",
      )}
    >
      <span
        className={cn(
          "font-display text-lg font-bold",
          player.position <= 3 ? "text-navy" : "text-muted",
        )}
      >
        {String(player.position).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <p className="truncate font-medium text-ink">{player.name}</p>
        <p className="truncate text-xs text-muted">
          {player.rivieraId} · {player.communityName}
        </p>
      </div>

      <span className="hidden text-sm text-muted sm:block">
        {player.category}
      </span>

      <span className="hidden text-sm text-muted sm:block">
        {player.matchesPlayed} PJ
      </span>

      <span className="hidden font-display text-sm font-bold text-navy sm:block">
        {player.points.toLocaleString("es-MX")} pts
      </span>

      <RankingMovement
        position={player.position}
        previousPosition={player.previousPosition}
      />
    </div>
  );
}
