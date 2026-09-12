"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  /* Arranca en "vidrio" (el estado por defecto, ver comentario abajo):
     así la mayoría de páginas —que no tienen una sección data-nav="solid"
     justo debajo del header— pintan la píldora correcta desde el primer
     frame, en vez de mostrar un flash sólido/blanco hasta que el efecto
     de scroll calcula el valor real. */
  const [glass, setGlass] = useState(true);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    /* La píldora es de vidrio (translúcida) por defecto. Sobre cualquier
       sección marcada explícitamente con data-nav="solid" (fondos negros
       o azules sólidos: hero, barra de stats, tarjeta del CTA, footer) se
       vuelve blanca y sólida en su lugar — igual en todas las páginas,
       porque esas secciones comparten los mismos componentes (CTABanner,
       Footer) en todo el sitio. Se detecta mirando qué elemento hay justo
       debajo del header en cada scroll. */
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      const x = window.innerWidth / 2;
      const y = header.getBoundingClientRect().bottom + 1;
      const el = document.elementFromPoint(x, y);
      const zone = el?.closest("[data-nav]")?.getAttribute("data-nav");
      setGlass(zone !== "solid");
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="relative mx-auto max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4">
        {/* Píldora flotante: vidrio esmerilado (fondo transparente +
            backdrop-filter blur+saturate, sin tinte de color ni sombra —
            el mismo material que usa la barra superior de lobehub.com:
            blur(16px) saturate(1.8) sobre fondo 100% transparente, sin
            degradado) sobre secciones claras; blanca y sólida sobre las
            marcadas data-nav="solid" (fondos negros/azules). */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-full px-3 py-1.5 transition-colors duration-300 sm:gap-4 sm:px-4 sm:py-2",
            !glass && "bg-white"
          )}
          style={
            glass
              ? {
                  backdropFilter: "saturate(1.8) blur(16px)",
                  WebkitBackdropFilter: "saturate(1.8) blur(16px)",
                }
              : { boxShadow: "0 4px 24px -4px rgba(14,14,14,0.15), 0 1px 2px rgba(14,14,14,0.06)" }
          }
        >
          <Link href="/" className="flex shrink-0 items-center" aria-label={site.name}>
            <Image
              src="/logo.png"
              alt={site.name}
              width={366}
              height={223}
              priority
              className="h-8 w-auto object-contain sm:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 font-display text-sm font-medium text-ink/75 transition-colors",
                    active
                      ? "bg-surface-muted font-semibold text-ink"
                      : "hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/appointment"
            className="hidden shrink-0 items-center rounded-full bg-primary px-5 py-2.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.06] hover:bg-primary-dark lg:flex"
          >
            Reservar ahora
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink transition-transform duration-300 hover:scale-[1.15] active:scale-95 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute inset-x-4 top-full z-40 mt-3 rounded-[28px] p-3 sm:inset-x-6 lg:hidden",
                !glass && "bg-white"
              )}
              style={
                glass
                  ? {
                      backdropFilter: "saturate(1.8) blur(16px)",
                      WebkitBackdropFilter: "saturate(1.8) blur(16px)",
                    }
                  : { boxShadow: "0 4px 24px -4px rgba(14,14,14,0.15), 0 1px 2px rgba(14,14,14,0.06)" }
              }
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 font-display text-base font-medium text-ink/80 transition-colors hover:bg-surface-muted hover:text-ink",
                      pathname === link.href && "bg-surface-muted text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/appointment"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-center font-display text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
                >
                  Reservar ahora
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
