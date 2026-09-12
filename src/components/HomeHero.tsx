"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export function HomeHero() {
  return (
    <section data-nav="solid" className="relative bg-ink">
      {/* Fondo negro sólido de respaldo (por si la imagen tarda en
          cargar), se extiende también detrás del header flotante. */}
      <div className="absolute inset-x-0 -top-[56px] bottom-0 bg-ink sm:-top-[72px]" />

      {/* Imagen del diente a pantalla completa, de borde a borde. */}
      <div className="absolute inset-x-0 -top-[56px] bottom-0 overflow-hidden sm:-top-[72px]">
        <Image
          src="/tooth.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[80%_center] sm:object-center"
        />
        {/* Capa oscura pareja sobre toda la imagen (no un degradado
            direccional) para que el texto sea más legible. */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[620px] sm:px-8 sm:py-20 lg:min-h-[720px]">
        <motion.div
          initial={{ opacity: 0.001, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-xl flex-col items-start text-left"
        >
          <h1 className="font-display text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[80px]">
            {site.tagline} es una realidad.
          </h1>
          <p className="mt-7 max-w-md font-display text-sm leading-relaxed text-white/80 sm:text-base">
            {site.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/appointment"
              className="rounded-full bg-white px-7 py-4 font-display text-[15px] font-semibold text-ink transition-all duration-300 hover:scale-[1.06] hover:bg-white/85"
            >
              Reservar ahora
            </Link>
            <Link
              href="/services"
              className="rounded-full bg-primary px-7 py-4 font-display text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.06] hover:bg-primary-dark"
            >
              Descubrir servicios
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
