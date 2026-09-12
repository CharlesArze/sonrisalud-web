import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/services";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/services/${service.slug}`} className="group block h-full">
        <TiltCard className="flex flex-col items-center border border-line bg-surface p-8 text-center transition-colors group-hover:border-primary/40">
          <div className="relative h-28 w-28 shrink-0">
            <Image src={service.image} alt="" fill sizes="112px" className="object-contain" />
          </div>
          <div className="mt-auto mb-3 pt-5">
            <h3 className="font-display text-xl font-medium text-foreground">{service.name}</h3>
            <span className="mt-3 inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-wide text-white">
              {service.category}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {service.shortDescription}
            </p>
          </div>
        </TiltCard>
      </Link>
    </Reveal>
  );
}
