import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/services/${service.slug}`} className="group block h-full">
        <TiltCard className="flex flex-col justify-between border border-line bg-surface p-8 transition-colors group-hover:border-primary/40">
          <div>
            <div className="flex items-start justify-between">
              <span className="font-display text-4xl font-medium text-primary/30 transition-colors group-hover:text-primary/60">
                {service.number}
              </span>
              <ArrowUpRight
                size={22}
                className="text-foreground-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
            <h3 className="mt-6 font-display text-xl font-medium text-foreground">{service.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {service.shortDescription}
            </p>
          </div>
          <span className="mt-6 inline-block w-fit rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {service.category}
          </span>
        </TiltCard>
      </Link>
    </Reveal>
  );
}
