import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stats } from "@/components/Stats";
import { CTABanner } from "@/components/CTABanner";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros | Sonrisalud",
  description: "Conoce la historia, valores y equipo de Sonrisalud, clínica dental en Arequipa.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Una clínica con visión de futuro"
        description={site.description}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] bg-surface-muted">
              <Image
                src="/about-kid-checkup.jpg"
                alt="Niño chocando la mano con su doctora tras una consulta dental"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Nuestro compromiso"
              title="Tratamientos de alta calidad, en un entorno cómodo"
              description="Nuestro equipo está comprometido a brindar tratamientos de alta calidad en un entorno cómodo y centrado en el paciente, desde limpiezas de rutina hasta procedimientos cosméticos avanzados."
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {site.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                <span className="font-display text-2xl font-medium text-primary">0{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-medium text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />
      <CTABanner />
    </>
  );
}
