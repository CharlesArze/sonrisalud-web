import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Sonrisalud",
  description: "Resolvemos las dudas más comunes sobre nuestros tratamientos dentales.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Preguntas frecuentes"
        title="Resolvemos tus dudas"
        description="Si tienes otra pregunta, escríbenos por WhatsApp y te respondemos enseguida."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <FaqAccordion />
      </section>

      <CTABanner />
    </>
  );
}
