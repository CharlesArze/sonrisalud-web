import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Sombra compuesta reutilizada por los elementos "liquid glass" (header,
 * botón flotante de WhatsApp, etc.): sombra difusa hacia abajo + highlight
 * interior sutil arriba, imitando un borde de vidrio esmerilado.
 */
export const glassShadow =
  "0 8px 30px -6px rgba(14,14,14,0.18), 0 1px 1px rgba(14,14,14,0.04), inset 0 1px 0 rgba(255,255,255,0.7)";
