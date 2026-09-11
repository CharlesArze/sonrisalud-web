import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/HomeHero";
import { Stats } from "@/components/Stats";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureBoxes } from "@/components/FeatureBoxes";
import { DoctorCard } from "@/components/DoctorCard";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { services, featuredServiceSlugs } from "@/content/services";
import { team } from "@/content/team";
import { site } from "@/content/site";

export default function Home() {
  const featured = services.filter((s) => featuredServiceSlugs.includes(s.slug));

  return (
    <>
      <HomeHero />
      <Stats />

      {/* Intro editorial: párrafo grande + pilares como enlaces con flecha */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="max-w-3xl font-display text-2xl font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[40px]">
            Elige Sonrisalud como tu clínica dental de confianza en Arequipa. Tu sonrisa es
            mucho más que dientes para nosotros — es tratamiento individualizado, tecnología
            de vanguardia y años de experiencia cuidando a cada paciente.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-10 sm:grid-cols-3">
          {site.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {pillar.description}
                  </p>
                </div>
                <ArrowUpRight size={20} className="mt-1 shrink-0 text-primary" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Service Boxs: tarjetas destacadas con foto */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
        <FeatureBoxes items={featured} />
      </section>

      {/* Servicios destacados */}
      <section className="bg-surface-muted py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Nuestros servicios"
              title="Cuidado dental para toda la familia"
            />
            <Reveal>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Ver todos los servicios
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* Estética dental promo */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Estética dental
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Haz tus dientes más blancos
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground-muted">
              Tres opciones de blanqueamiento dental profesional, adaptadas a tu tiempo y
              presupuesto, para que recuperes una sonrisa luminosa.
            </p>
            <ul className="mt-6 space-y-3">
              {["Blanqueamiento en consultorio", "Blanqueamiento con kit personalizado", "Mantenimiento periódico"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Más información
              <ArrowRight size={16} />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <Placeholder tone="primary" className="aspect-[4/3] w-full" />
          </Reveal>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-surface-muted py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Nuestro equipo"
            title="Profesionales que cuidan tu sonrisa"
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((member, i) => (
              <DoctorCard key={member.slug} member={member} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros pacientes"
          align="center"
          className="mb-14"
        />
        <TestimonialSlider />
      </section>

      {/* FAQ */}
      <section className="bg-surface-muted py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas"
            align="center"
            className="mb-14"
          />
          <FaqAccordion />
        </div>
      </section>

      {/* Contacto */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Contacto"
            title="Escríbenos y agenda tu cita"
            description="Completa el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas."
          />
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
