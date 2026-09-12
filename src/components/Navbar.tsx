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
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4">
        {/* Píldora flotante blanca sólida con sombra suave. */}
        <div
          className="flex items-center justify-between gap-3 rounded-full bg-white px-3 py-1.5 sm:gap-4 sm:px-4 sm:py-2"
          style={{ boxShadow: "0 4px 24px -4px rgba(14,14,14,0.15), 0 1px 2px rgba(14,14,14,0.06)" }}
        >
          <Link href="/" className="flex shrink-0 items-center" aria-label={site.name}>
            <Image
              src="/logo.jpg"
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
            className="hidden shrink-0 items-center rounded-full bg-primary px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-primary-dark lg:flex"
          >
            Reservar ahora
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div
            className="mt-3 rounded-[28px] bg-white p-3 lg:hidden"
            style={{ boxShadow: "0 4px 24px -4px rgba(14,14,14,0.15), 0 1px 2px rgba(14,14,14,0.06)" }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 font-display text-base font-medium text-ink/80 hover:bg-surface-muted hover:text-ink",
                    pathname === link.href && "bg-surface-muted text-ink"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/appointment"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-center font-display text-sm font-semibold text-white"
              >
                Reservar ahora
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
