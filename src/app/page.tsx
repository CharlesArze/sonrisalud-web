import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/HomeHero";
import { Stats } from "@/components/Stats";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { DoctorCard } from "@/components/DoctorCard";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Stats />

      {/* Intro editorial: párrafo grande + collage + pilares como enlaces con flecha */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-display text-[22px] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[38px]">
              Elige Sonrisalud <span className="font-normal text-foreground-muted">como</span> tu
              clínica dental de confianza en Arequipa. Tu sonrisa es mucho más que dientes para
              nosotros — <span className="font-normal text-foreground-muted">es</span>{" "}
              <span className="font-bold italic">tratamiento individualizado</span>,{" "}
              <span className="font-bold italic">tecnología de vanguardia</span>{" "}
              <span className="font-normal text-foreground-muted">y</span> años{" "}
              <span className="font-normal text-foreground-muted">de</span>{" "}
              <span className="font-bold italic">experiencia</span> cuidando a cada paciente.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] bg-surface-muted">
              <Image
                src="/about-collage.jpg"
                alt="Collage de la clínica Sonrisalud: atención a paciente, modelo de ortodoncia y consultorio"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
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
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
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
            <span className="inline-flex items-center rounded-full bg-ink px-4 py-1.5 text-xs font-semibold tracking-wider text-white">
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
                  <li key={item} className="text-[28px] font-normal text-foreground">
                    {item}
                  </li>
                )
              )}
            </ul>
            <a
              href={`${site.whatsappHref}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.05] hover:bg-primary-dark"
            >
              Más información
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[4/3] w-[70%] overflow-hidden rounded-[var(--radius-lg)] bg-surface-muted">
              <Image
                src="/whitening-teeth.jpg"
                alt="Tres dientes en tono azul representando las opciones de blanqueamiento dental"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Equipo */}
      <section className="relative bg-surface-muted py-20 sm:py-28">
        {/* Degradado sutil que suaviza el corte entre el fondo blanco de
            la sección anterior y el gris de esta. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
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

      {/* Antes / Después */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Resultados"
          title="Desliza para ver la diferencia"
          description="Un ejemplo de lo que puede lograr un tratamiento de blanqueamiento dental."
          align="center"
          className="mb-14"
        />
        <Reveal className="flex justify-center">
          <BeforeAfterSlider
            before="/smile-before.jpg"
            after="/smile-after.jpg"
            beforeAlt="Sonrisa antes del blanqueamiento dental"
            afterAlt="Sonrisa después del blanqueamiento dental"
          />
        </Reveal>
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
        {/* En móvil el orden es: título → formulario → imagen (centrada,
            más chica). En desktop la imagen vuelve a su columna, debajo
            del título, gracias a la ubicación explícita de grid, y se
            mantiene centrada dentro de esa columna izquierda. */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-10">
          <SectionHeading
            eyebrow="Contacto"
            title="Escríbenos y agenda tu cita"
            description="Completa el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas."
            className="lg:col-start-1 lg:row-start-1"
          />
          <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.15} className="mx-auto w-full max-w-[224px] lg:col-start-1 lg:row-start-2 lg:max-w-[314px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] bg-surface-muted">
              <Image
                src="/dental-mold.png"
                alt="Molde dental en 3D en tono azul"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
