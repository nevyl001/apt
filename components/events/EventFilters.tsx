"use client";

import { cn } from "@/lib/utils/cn";
import type { EventFormat } from "@/lib/types";

export type EventFilterValue = "todos" | EventFormat | "otros";

const FILTERS: { value: EventFilterValue; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "reta", label: "Retas" },
  { value: "torneo", label: "Torneos" },
  { value: "liga", label: "Ligas" },
  { value: "otros", label: "Otros" },
];

export function EventFilters({
  active,
  onChange,
}: {
  active: EventFilterValue;
  onChange: (value: EventFilterValue) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar eventos por tipo"
      className="flex flex-wrap gap-2"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
              isActive
                ? "bg-navy text-white"
                : "bg-transparent text-muted hover:bg-navy/5 hover:text-navy",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
