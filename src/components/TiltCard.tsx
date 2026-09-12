"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ══ TiltCard ═══════════════════════════════════════════════
   A card that gives under the pointer, instead of lifting to
   meet it. Most tilt-on-hover components rotate TOWARD the
   cursor — the corner nearest you rises, and the card reads as
   a slab of glass catching light. This one does the opposite:
   the point under the pointer moves AWAY and the far side comes
   up, which is what a surface being pressed looks like rather
   than a surface being displayed. The whole difference is one
   sign: rx = -ny, ry = +nx, instead of the usual +ny/-nx pair.

   The rotation alone doesn't sell it — a rotation about the
   centre is symmetric (near side down, far side up by the same
   amount) and on its own reads as the card pivoting, not being
   pressed. What makes it a press is that the darkest point
   tracks the pointer (a dent catches shadow at its deepest) and
   the opposite rim catches light. Those two gradients carry at
   least as much of the effect as the transform does.

   Everything is driven off ONE piece of state: the pointer
   position, normalised to -1..1 on each axis and passed through
   a spring. The rotation, both gradients and the shadow are all
   read from that same spring value, so they can't fall out of
   sync with each other the way three independently-animated
   properties could. */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/* Perspective: distance from the eye to the glass. Small = a
   face close to the screen, so the near corner grows and the
   far one shrinks more per degree of tilt. 900 against cards in
   the 250-400px range keeps the foreshortening a suggestion
   rather than a fisheye. */
const DEPTH = 900;

/* How far the card retreats while pressed. Kept small on
   purpose — past ~20 this stops reading as a press and starts
   reading as a zoom. */
const SINK = 10;

/* Antes en 8, luego 5.6: el "tambaleo" (la inclinación 3D) seguía
   sintiéndose marcado al pasar el mouse. Bajado otro 30% más. */
const TILT = 3.92;
/* Antes en 45, luego 18: el sombreado que sigue al puntero seguía
   sintiéndose marcado. Bajado otro 30% más, para que quede como un
   matiz apenas perceptible sin perder la sensación de "presión". */
const SHADE = 12.6;

/* One spring for the pointer position: stiffness and decay are
   derived from a single 0..100 "tune" via damping ratio, so the
   knob has one meaning (heavy and settled vs. quick with a
   little overshoot) instead of two numbers that can be set
   inconsistently against each other. */
function springOf(tune: number) {
  return {
    k: 0.08 + (tune / 100) * 0.16,
    d: 0.62 + (tune / 100) * 0.2,
  };
}

function useSpring(target: number, tune = 50, instant = false) {
  const [at, setAt] = useState(target);
  const cur = useRef(target);
  const vel = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    /* `instant` (reduced motion) skips the spring entirely — the
       hook returns `target` directly below, so there is nothing
       to animate here. The refs are still kept in sync so that
       if `instant` later turns false the spring picks up from
       the real target instead of wherever it last stopped. */
    if (instant) {
      cur.current = target;
      vel.current = 0;
      return;
    }
    const { k, d } = springOf(tune);
    let prev = 0;
    const tick = (t: number) => {
      const dt = prev ? clamp((t - prev) / 16.67, 0, 2.5) : 1;
      prev = t;
      vel.current += (target - cur.current) * k * dt;
      vel.current *= Math.pow(d, dt);
      cur.current += vel.current * dt;
      if (Math.abs(target - cur.current) < 0.02 && Math.abs(vel.current) < 0.02) {
        cur.current = target;
        vel.current = 0;
        setAt(target);
        raf.current = 0;
        return;
      }
      setAt(cur.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [target, tune, instant]);

  return instant ? target : at;
}

const prefersStillness = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function TiltCard({
  children,
  className,
  /* radius must match whatever rounding `className` puts on the
     card, since the sheen overlay needs the same corners and
     can't read it back out of an arbitrary Tailwind class */
  radius = "var(--radius-lg)",
  tilt = TILT,
  shade = SHADE,
}: {
  children: ReactNode;
  className?: string;
  radius?: string;
  tilt?: number;
  shade?: number;
}) {
  const frame = useRef<HTMLDivElement | null>(null);
  const [at, setAt] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  const still = prefersStillness();

  const sx = useSpring(on ? at.x : 0, 50, still);
  const sy = useSpring(on ? at.y : 0, 50, still);
  const lit = useSpring(on ? 1 : 0, 50, still);

  const max = clamp(tilt, 0, 20);
  const rx = -sy * max;
  const ry = sx * max;

  const px = ((sx + 1) / 2) * 100;
  const py = ((sy + 1) / 2) * 100;
  const dark = (clamp(shade, 0, 100) / 100) * 0.5 * lit;
  const rim = (clamp(shade, 0, 100) / 100) * 0.3 * lit;

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const el = frame.current;
    if (!el) return;
    /* measured from the frame, which never rotates — reading
       the card itself would mean asking a tilted surface where
       the pointer is relative to it, which is wrong right at
       the edges where it matters most */
    const r = el.getBoundingClientRect();
    setAt({
      x: clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1),
      y: clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1),
    });
    setOn(true);
  };

  return (
    <div
      ref={frame}
      className="tilt-frame h-full"
      style={{ perspective: DEPTH }}
      onPointerMove={track}
      /* containment test rather than onPointerLeave: a touch
         handed off to a scroll, or a pointer that leaves the
         window entirely, both still need the card to settle */
      onPointerOut={(e) => {
        const el = frame.current;
        const to = e.relatedTarget as Node | null;
        if (!el || !to || !el.contains(to)) setOn(false);
      }}
      onPointerCancel={() => setOn(false)}
    >
      <div
        className={cn("tilt-card relative h-full", className)}
        style={{
          borderRadius: radius,
          transform: `translateZ(${-SINK * lit}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
          /* the shadow TIGHTENS as it's pressed — a lifted card
             would grow its shadow, and doing that here would
             fight every other cue */
          boxShadow: `0 ${mix(16, 6, lit)}px ${mix(36, 18, lit)}px -10px rgba(var(--tilt-shadow-rgb), ${mix(
            0.16,
            0.1,
            lit,
          )})`,
        }}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: "inherit",
            backgroundImage: `radial-gradient(42% 34% at ${px}% ${py}%, rgba(var(--tilt-shadow-rgb), ${dark}) 0%, rgba(var(--tilt-shadow-rgb), 0) 100%), radial-gradient(52% 42% at ${
              100 - px
            }% ${100 - py}%, rgba(var(--tilt-rim-rgb), ${rim}) 0%, rgba(var(--tilt-rim-rgb), 0) 100%)`,
          }}
        />
      </div>
    </div>
  );
}
