"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";

export function TestimonialSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [thumb, setThumb] = useState({ width: 100, left: 0 });

  const updateThumb = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth, scrollLeft } = el;
    const width = Math.min(100, (clientWidth / scrollWidth) * 100);
    const maxScroll = scrollWidth - clientWidth;
    const left = maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - width) : 0;
    setThumb({ width, left });
  };

  useEffect(() => {
    updateThumb();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateThumb, { passive: true });
    window.addEventListener("resize", updateThumb);
    return () => {
      el?.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  const scrollFromClientX = (clientX: number) => {
    const bar = barRef.current;
    const track = trackRef.current;
    if (!bar || !track) return;
    const r = bar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    track.scrollLeft = pct * (track.scrollWidth - track.clientWidth);
  };

  const onBarDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scrollFromClientX(e.clientX);
  };
  const onBarMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) scrollFromClientX(e.clientX);
  };
  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div>
      {/* Carrusel de opiniones: desliza horizontalmente (touch, trackpad
          o arrastrando la barra de abajo), sin puntos ni tarjeta única
          que cambia — cada opinión es su propia tarjeta en la fila.
          El -my-14/py-14 le da a la sombra de las tarjetas suficiente
          espacio para desvanecerse del todo en vez de cortarse de golpe
          (overflow-x:auto fuerza overflow-y:auto también, así que sin
          ese aire la sombra se recorta justo en el borde de la caja).
          El degradado lateral (mask-image) desvanece las tarjetas al
          llegar a los bordes de la pantalla en vez de cortarlas en seco. */}
      <div className="-my-14">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 py-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="w-[85%] shrink-0 snap-center rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center sm:w-[400px] sm:p-10"
              style={{
                boxShadow: "0 24px 48px -18px rgba(14,14,14,0.15), 0 6px 16px -6px rgba(14,14,14,0.08)",
              }}
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
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

      {/* Barra para deslizar el carrusel manualmente arrastrando, con más
          aire arriba para que la sombra de las tarjetas no choque con
          ella (antes quedaban demasiado pegadas). */}
      <div
        ref={barRef}
        onPointerDown={onBarDown}
        onPointerMove={onBarMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="relative mx-auto mt-20 h-1.5 w-full max-w-xs cursor-pointer touch-none rounded-full bg-line"
      >
        <div
          className="absolute top-0 h-1.5 rounded-full bg-primary"
          style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
        />
      </div>
    </div>
  );
}
