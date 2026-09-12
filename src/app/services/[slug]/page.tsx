import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Sonrisalud`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-primary"
            >
              <ArrowLeft size={16} />
              Todos los servicios
            </Link>
          </Reveal>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="font-display text-5xl font-medium text-primary/30">
                {service.number}
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
                {service.description}
              </p>
              <Link
                href="/appointment"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.05] hover:bg-primary-dark"
              >
                Reservar ahora
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <Placeholder className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="font-display text-2xl font-medium text-foreground">
            Lo que incluye el tratamiento
          </h2>
          <ul className="mt-6 space-y-4">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-foreground-muted">
                <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-surface-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
              Otros servicios
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
