import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto | Sonrisalud",
  description: "Escríbenos o visítanos en nuestra clínica dental en Arequipa.",
};

const infoItems = [
  { icon: MapPin, label: "Dirección", value: site.address },
  { icon: Phone, label: "Teléfono", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Correo", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Horario", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Escríbenos y agenda tu cita"
        description="Completa el formulario o contáctanos directamente. Respondemos en menos de 24 horas."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <div className="space-y-6">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-foreground-muted hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground-muted">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
