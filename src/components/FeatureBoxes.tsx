import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import type { Service } from "@/content/services";

export function FeatureBoxes({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, i) => (
        <Reveal key={service.slug} delay={i * 0.1}>
          <Link href={`/services/${service.slug}`} className="group block">
            <TiltCard className="relative aspect-[4/5] overflow-hidden">
              <Placeholder tone="accent" className="absolute inset-0 h-full w-full" />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background: "linear-gradient(to top, rgb(14,14,14) 0%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <span className="font-display text-xl font-semibold tracking-[-0.02em] text-white">
                  {service.name}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:scale-110">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </TiltCard>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
