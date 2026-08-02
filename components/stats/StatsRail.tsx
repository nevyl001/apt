import type { CommunityStat } from "@/lib/types";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

export function StatsRail({ stats }: { stats: CommunityStat[] }) {
  return (
    <section className="border-y border-border bg-surface">
      <div className="apt-container grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-5 lg:py-12">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center lg:text-left">
            <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
              {stat.value === null ? (
                <span className="text-xl font-medium text-muted sm:text-2xl">
                  Próximamente
                </span>
              ) : (
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              )}
            </p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
