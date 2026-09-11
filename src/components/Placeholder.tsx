import { Smile } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bloque decorativo que sustituye una fotografía real. Este prototipo no
 * usa imágenes con licencia de terceros; en producción se reemplazaría por
 * fotografías reales de la clínica.
 */
export function Placeholder({
  icon: Icon = Smile,
  className,
  tone = "primary",
}: {
  icon?: LucideIcon;
  className?: string;
  tone?: "primary" | "accent";
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[var(--radius-lg)]",
        tone === "primary"
          ? "bg-gradient-to-br from-primary-soft via-surface to-primary-soft"
          : "bg-ink",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <Icon
        className={cn(
          "relative h-1/3 w-1/3",
          tone === "primary" ? "text-primary/40" : "text-white/30"
        )}
        strokeWidth={1.2}
      />
    </div>
  );
}
