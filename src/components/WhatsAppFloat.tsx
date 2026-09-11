"use client";

import { site } from "@/content/site";
import { WhatsAppIcon } from "./SocialIcons";
import { glassShadow } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      href={`${site.whatsappHref}?text=${encodeURIComponent(
        "Hola, quisiera más información sobre sus servicios dentales."
      )}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-primary/70 text-white backdrop-blur-xl backdrop-saturate-150 transition-transform hover:scale-105 hover:bg-primary/85"
      style={{ boxShadow: glassShadow }}
      aria-label="Escribir por WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
