"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { useSmoothMarquee } from "@/lib/useMarqueeSpeed";

export function TestimonialSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hoverHandlers = useSmoothMarquee(trackRef);

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
    // w-screen + ml-[50%] -translate-x-1/2: "full-bleed" — saca la
    // cinta del max-w-7xl/px del <section> que la envuelve en page.tsx
    // para que ocupe el ancho completo de la pantalla, de borde a borde.
    <div className="relative -my-14 ml-[50%] w-screen -translate-x-1/2 overflow-hidden">
      {/* Desvanecido en los bordes: dos overlays fijos (no una máscara
          sobre el track) que van del blanco de fondo de la página,
          sólido, a transparente — las tarjetas parecen desvanecerse en
          la página en vez de cortarse. pointer-events-none para nunca
          interceptar el hover de una tarjeta.
          Tienen que ir en este contenedor fijo y no en el track: el
          track se traslada con la animación, así que una máscara
          puesta ahí viaja con él y el desvanecido deja de coincidir con
          el borde real de la pantalla la mayor parte del tiempo. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent md:w-32" />
      <div ref={trackRef} className="flex w-max py-14">
        {cards.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            // Los handlers de hover van en cada tarjeta, no en el
            // contenedor: así el marquee solo frena exactamente sobre
            // una tarjeta, no en los márgenes/huecos entre ellas.
            {...hoverHandlers}
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
