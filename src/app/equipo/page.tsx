import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DoctorCard } from "@/components/DoctorCard";
import { CTABanner } from "@/components/CTABanner";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Equipo | Sonrisalud",
  description: "Conoce a los profesionales de Sonrisalud, clínica dental en Arequipa.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestro equipo"
        title="Profesionales que cuidan tu sonrisa"
        description="Un equipo con años de experiencia combinando precisión clínica y trato genuinamente humano."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member, i) => (
            <DoctorCard key={member.slug} member={member} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
