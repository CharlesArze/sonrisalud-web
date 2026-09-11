"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center sm:p-14">
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className="fill-primary text-primary" />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="mt-6 font-display text-lg leading-relaxed tracking-[-0.01em] text-ink sm:text-xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-5 font-display text-base font-semibold text-primary">
              {current.name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver testimonio de ${t.name}`}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border font-display text-sm font-semibold transition-colors",
              i === index
                ? "border-primary bg-primary-soft text-primary"
                : "border-line text-foreground-muted hover:border-primary/40"
            )}
          >
            {t.name.charAt(0)}
          </button>
        ))}
      </div>
    </div>
  );
}
