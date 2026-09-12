"use client";

import { site } from "@/content/site";
import { WhatsAppIcon } from "./SocialIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={`${site.whatsappHref}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105 hover:bg-primary-dark"
      aria-label="Escribir por WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
