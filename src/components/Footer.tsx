import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { site, navLinks } from "@/content/site";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-7xl rounded-[var(--radius-lg)] bg-ink px-6 py-14 text-white sm:px-12 sm:py-20">
        <div className="flex flex-col items-center gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-start lg:justify-between">
          <Link href="/" className="flex items-center rounded-2xl bg-white p-2" aria-label={site.name}>
            <Image
              src="/logo.jpg"
              alt={site.name}
              width={447}
              height={447}
              className="h-20 w-20 rounded-xl object-cover"
            />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-[15px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Con base en
              <br />
              Arequipa
            </h2>
            <p className="mt-4 max-w-sm font-display text-sm text-white/60">{site.address}</p>
          </div>

          <div className="space-y-4">
            <FooterContact icon={Phone} href={site.phoneHref} label={site.phone} />
            <FooterContact icon={Mail} href={`mailto:${site.email}`} label={site.email} />
            <FooterContact icon={MapPin} label={site.hours} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 pt-6 font-display text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="cursor-default">Política de privacidad</span>
            <span className="cursor-default">Términos de referencia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
  label: string;
}) {
  const content = (
    <span className="flex items-center gap-3 font-display text-base text-white/85">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20">
        <Icon size={16} className="text-white" />
      </span>
      {label}
    </span>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-70">
      {content}
    </a>
  ) : (
    content
  );
}
