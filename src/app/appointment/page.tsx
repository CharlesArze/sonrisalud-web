import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Reservar cita | Sonrisalud",
  description: "Programa tu cita en Sonrisalud en pocos pasos.",
};

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservar cita"
        title="Programa tu cita hoy mismo"
        description="Disfruta de una atención dental experta y personal. Elige el servicio, la fecha y confirma en minutos."
      />

      <section className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
        <BookingForm />
      </section>
    </>
  );
}
