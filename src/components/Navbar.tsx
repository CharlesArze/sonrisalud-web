"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Barra rectangular de borde a borde, pegada arriba del todo,
          en vidrio translúcido con blur (en vez de la píldora flotante). */}
      <div className="flex w-full items-center justify-between gap-3 border-b border-white/30 bg-white/50 px-5 py-2 backdrop-blur-lg backdrop-saturate-150 sm:gap-4 sm:px-8 sm:py-2.5">
        <Link href="/" className="flex shrink-0 items-center" aria-label={site.name}>
          <Image
            src="/logo.jpg"
            alt={site.name}
            width={447}
            height={447}
            priority
            className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
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
                    ? "bg-white/60 font-semibold text-ink shadow-[0_1px_2px_rgba(14,14,14,0.08)]"
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
          className="hidden shrink-0 items-center gap-2.5 rounded-full bg-ink px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-ink/85 lg:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Reservar ahora
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/55 text-ink lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="w-full border-b border-white/30 bg-white/60 p-3 backdrop-blur-lg backdrop-saturate-150 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 font-display text-base font-medium text-ink/80 hover:bg-white/40 hover:text-ink",
                  pathname === link.href && "bg-white/60 text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-center font-display text-sm font-semibold text-white"
            >
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Reservar ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
