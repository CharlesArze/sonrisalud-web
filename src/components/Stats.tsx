"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { useMarqueeSpeed } from "@/lib/useMarqueeSpeed";

function StatGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {site.stats.map((stat) => (
        <div key={stat.label} className="flex items-center">
          <div className="flex items-baseline gap-3 px-[29px] sm:px-[38px]">
            <span className="font-display text-sm font-extrabold tracking-[-0.02em] text-white sm:text-base">
              {stat.value}
            </span>
            <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Stats() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  useMarqueeSpeed(trackRef);

  return (
    <section data-nav="solid" className="overflow-hidden bg-primary py-3">
      <div ref={trackRef} className="animate-marquee flex w-max">
        <StatGroup />
        <StatGroup />
        <StatGroup />
        <StatGroup />
      </div>
    </section>
  );
}
