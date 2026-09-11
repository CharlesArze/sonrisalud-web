import { site } from "@/content/site";

function StatGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {site.stats.map((stat) => (
        <div key={stat.label} className="flex items-center">
          <div className="flex flex-col items-center px-10 text-center sm:px-14">
            <p className="font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 font-display text-xs font-semibold uppercase tracking-wider text-white/80 sm:text-sm">
              {stat.label}
            </p>
          </div>
          <span className="h-2 w-2 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export function Stats() {
  return (
    <section className="overflow-hidden bg-primary py-10 sm:py-12">
      <div className="animate-marquee flex w-max">
        <StatGroup />
        <StatGroup />
        <StatGroup />
        <StatGroup />
      </div>
    </section>
  );
}
