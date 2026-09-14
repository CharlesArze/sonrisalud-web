"use client";

import { useEffect, type RefObject } from "react";

// px/s compartido por toda cinta tipo "marquee" (Stats, testimonios):
// una sola cinta de referencia, cualquier otra que use este mismo
// número se ve moviéndose a la misma velocidad sin importar su ancho.
export const MARQUEE_SPEED = 60;

/**
 * Fija animation-duration para que un track marquee (contenido
 * duplicado 2x, keyframe que traslada -50%) avance a pxPerSecond en
 * vez de a una duración fija — así dos cintas con contenido de ancho
 * distinto se mueven a la misma velocidad real.
 *
 * Archivo aparte de utils.ts a propósito: useEffect es client-only, y
 * utils.ts también lo importan Server Components (vía cn), lo que
 * rompe el build si arrastra React ahí.
 */
export function useMarqueeSpeed(ref: RefObject<HTMLElement | null>, pxPerSecond: number = MARQUEE_SPEED) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      el.style.animationDuration = `${el.scrollWidth / 2 / pxPerSecond}s`;
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [ref, pxPerSecond]);
}
