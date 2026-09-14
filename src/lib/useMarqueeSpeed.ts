"use client";

import { useEffect, useRef, type RefObject } from "react";

// px/s compartido por toda cinta tipo "marquee" (Stats, testimonios):
// una sola cinta de referencia, cualquier otra que use este mismo
// número se ve moviéndose a la misma velocidad sin importar su ancho.
export const MARQUEE_SPEED = 90;

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

// 1/s: qué tan rápido la velocidad actual persigue a la velocidad
// objetivo (0 en hover, pxPerSecond al salir). Más bajo = frenada y
// arranque más largos y suaves; más alto = más brusco.
const EASE_RATE = 2.2;

/**
 * Marquee animado a mano por rAF (en vez de @keyframes + animation-
 * play-state) para poder frenar y volver a arrancar con una
 * desaceleración suave al pasar/quitar el cursor — animation-play-
 * state es binario (corre o se congela en seco), no se puede
 * transicionar.
 *
 * Devuelve los handlers de hover para poner en el contenedor visible
 * (el que no se mueve); el propio `ref` es el track que sí se traslada
 * y debe tener el contenido duplicado 2x, igual que con useMarqueeSpeed.
 */
export function useSmoothMarquee(ref: RefObject<HTMLElement | null>, pxPerSecond: number = MARQUEE_SPEED) {
  const hovering = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let half = el.scrollWidth / 2;
    const onResize = () => {
      half = el.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize);

    let offset = 0;
    let speed = pxPerSecond;
    let last = 0;
    let raf = requestAnimationFrame(function tick(t) {
      // dt tope: si la pestaña estuvo en background, el próximo frame
      // llega con un salto de segundos — sin tope, la cinta "teletransporta".
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      const target = hovering.current ? 0 : pxPerSecond;
      speed += (target - speed) * Math.min(EASE_RATE * dt, 1);
      offset -= speed * dt;
      if (offset <= -half) offset += half;
      el.style.transform = `translateX(${offset}px)`;
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, pxPerSecond]);

  return {
    onMouseEnter: () => {
      hovering.current = true;
    },
    onMouseLeave: () => {
      hovering.current = false;
    },
  };
}
