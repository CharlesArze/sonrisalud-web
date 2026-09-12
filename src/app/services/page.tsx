import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Servicios | Sonrisalud",
  description: "Ortodoncia, estética dental e implantes dentales en Sonrisalud.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Cuidado dental para toda la familia"
        description="Tres especialidades pensadas para acompañarte en cada etapa: ortodoncia, estética dental e implantes."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
