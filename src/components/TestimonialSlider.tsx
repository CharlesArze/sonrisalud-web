"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { useMarqueeSpeed } from "@/lib/useMarqueeSpeed";

export function TestimonialSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  useMarqueeSpeed(trackRef);

  // Duplicado para el loop infinito (mismo truco que Stats): la
  // animación traslada -50%, que debe caer justo donde empieza la
  // segunda copia. El espaciado es un margen de cada tarjeta (mr-6) y
  // no un `gap` del contenedor: con `gap`, el hueco entre la última
  // tarjeta de la copia 1 y la primera de la copia 2 cuenta una vez
  // de más y el 50% deja de caer exacto — se nota un salto en cada
  // vuelta. Con margen, cada tarjeta "es dueña" de su propio espacio y
  // las dos copias miden exactamente lo mismo.
  const cards = [...testimonials, ...testimonials];

  return (
    // El -my-14/py-14 le da a la sombra de las tarjetas suficiente
    // espacio para desvanecerse del todo en vez de cortarse de golpe.
    // .testimonial-marquee:hover (ver globals.css) pausa el track al
    // pasar el cursor por cualquier tarjeta; al retirarlo, sigue solo.
    <div className="testimonial-marquee -my-14 overflow-hidden">
      <div
        ref={trackRef}
        className="animate-marquee flex w-max py-14"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)",
        }}
      >
        {cards.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            // w-[85vw], no w-[85%]: el contenedor es w-max (ancho
            // intrínseco) para el truco del marquee, y un % ahí crea
            // una referencia circular (ancho en % de un contenedor
            // cuyo ancho depende del contenido) que dispara el ancho
            // real de la tarjeta a miles de px.
            className="mr-6 w-[85vw] shrink-0 rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center sm:w-[400px] sm:p-10"
            style={{
              boxShadow: "0 24px 48px -18px rgba(14,14,14,0.15), 0 6px 16px -6px rgba(14,14,14,0.08)",
            }}
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-6 font-display text-lg leading-relaxed tracking-[-0.01em] text-ink sm:text-xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-5 font-display text-base font-semibold text-primary">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
