"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { glassShadow } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Fondo: imagen de diente centrada en toda la sección */}
      <div className="absolute inset-0">
        <Image
          src="/tooth.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-background) 0%, var(--color-background) 32%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[620px] sm:px-8 sm:py-20 lg:min-h-[720px]">
        <motion.div
          initial={{ opacity: 0.001, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-xl flex-col items-start text-left"
        >
          <h1 className="font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px] lg:text-[80px]">
            {site.tagline} es una realidad.
          </h1>
          <p className="mt-7 max-w-md font-display text-base leading-relaxed text-foreground-muted sm:text-lg">
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
              className="rounded-full border border-white/40 bg-white/25 px-7 py-4 font-display text-[15px] font-semibold text-ink backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white/40"
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
