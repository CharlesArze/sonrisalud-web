import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Servicios | Sonrisalud",
  description:
    "Ortodoncia, blanqueamiento dental, implantes, cuidado preventivo, odontopediatría y estética dental en Sonrisalud.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Cuidado dental para toda la familia"
        description="Seis especialidades pensadas para acompañarte en cada etapa: desde revisiones preventivas hasta tratamientos estéticos avanzados."
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
