import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "@/content/site";

export function CTABanner({
  title = "Programa tu cita hoy mismo",
  description = "Disfruta de una atención dental experta y personal. Escríbenos o reserva en línea.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-primary px-8 py-14 text-center text-white sm:px-16 sm:py-20">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">{description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/appointment"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary-dark transition-transform hover:scale-[1.03]"
              >
                Reservar ahora
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
