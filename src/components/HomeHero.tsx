"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { glassShadow } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative bg-background">
      {/* Fondo: se extiende hacia arriba exactamente lo que mide el
          header (65px en móvil, 85px en sm+) para que la imagen se
          vea también detrás de la barra, de borde a borde. */}
      <div className="absolute inset-x-0 -top-[65px] bottom-0 overflow-hidden sm:-top-[85px]">
        <Image
          src="/tooth.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[620px] sm:px-8 sm:py-20 lg:min-h-[720px]">
        <motion.div
          initial={{ opacity: 0.001, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-xl flex-col items-start text-left"
        >
          <h1 className="font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[80px]">
            {site.tagline} es una realidad.
          </h1>
          <p className="mt-7 max-w-md font-display text-sm leading-relaxed text-white/80 sm:text-base">
            {site.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/appointment"
              className="rounded-full bg-primary px-7 py-4 font-display text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Reservar ahora
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/40 bg-white/25 px-7 py-4 font-display text-[15px] font-semibold text-white backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white/40"
              style={{ boxShadow: glassShadow }}
            >
              Descubrir servicios
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
