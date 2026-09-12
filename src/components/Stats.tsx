import { site } from "@/content/site";

function StatGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {site.stats.map((stat) => (
        <div key={stat.label} className="flex items-center">
          <div className="flex items-baseline gap-3 px-12 sm:px-16">
            <span className="font-display text-sm font-extrabold tracking-[-0.02em] text-white sm:text-base">
              {stat.value}
            </span>
            <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
              {stat.label}
            </span>
          </div>
          <span className="h-2 w-2 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export function Stats() {
  return (
    <section className="overflow-hidden bg-primary py-3">
      <div className="animate-marquee flex w-max">
        <StatGroup />
        <StatGroup />
        <StatGroup />
        <StatGroup />
      </div>
    </section>
  );
}
