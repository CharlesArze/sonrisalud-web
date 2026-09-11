"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
const steps = ["Servicio", "Fecha y hora", "Tus datos", "Confirmación"];

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState<string>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = services.find((s) => s.slug === serviceSlug);

  const canAdvance =
    (step === 0 && !!serviceSlug) ||
    (step === 1 && !!date && !!time) ||
    (step === 2 && !!name && !!phone);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const whatsappMessage = encodeURIComponent(
    `Hola, quiero confirmar mi cita:\n- Servicio: ${selectedService?.name ?? ""}\n- Fecha: ${date}\n- Hora: ${time}\n- Nombre: ${name}\n- Teléfono: ${phone}`
  );

  if (confirmed) {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-line bg-surface p-10 text-center">
        <Image
          src="/logo.jpg"
          alt={site.name}
          width={447}
          height={447}
          className="h-16 w-16 rounded-full object-cover"
        />
        <h3 className="mt-4 font-display text-2xl font-medium text-foreground">
          ¡Solicitud de cita recibida!
        </h3>
        <p className="mt-2 max-w-md text-sm text-foreground-muted">
          Este es un prototipo visual, así que tu cita no queda agendada realmente. En el sitio
          final, nuestro equipo confirmaría el horario en minutos.
        </p>
        <div className="mt-6 w-full max-w-sm rounded-[var(--radius-md)] bg-surface-muted p-5 text-left text-sm text-foreground-muted">
          <p><span className="font-medium text-foreground">Servicio:</span> {selectedService?.name}</p>
          <p><span className="font-medium text-foreground">Fecha:</span> {date}</p>
          <p><span className="font-medium text-foreground">Hora:</span> {time}</p>
          <p><span className="font-medium text-foreground">Nombre:</span> {name}</p>
        </div>
        <a
          href={`${site.whatsappHref}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <MessageCircle size={18} />
          Confirmar por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  i < step
                    ? "bg-primary text-white"
                    : i === step
                    ? "border-2 border-primary text-primary"
                    : "border border-line text-foreground-muted"
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className="hidden text-xs text-foreground-muted sm:block">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition-colors",
                  i < step ? "bg-primary" : "bg-line"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && (
            <div>
              <h3 className="font-display text-xl font-medium text-foreground">
                ¿Qué servicio necesitas?
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setServiceSlug(s.slug)}
                    className={cn(
                      "rounded-[var(--radius-md)] border px-4 py-3.5 text-left text-sm font-medium transition-colors",
                      serviceSlug === s.slug
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-line text-foreground hover:border-primary/40"
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-display text-xl font-medium text-foreground">
                Elige fecha y hora
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-foreground">
                    Fecha
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-[var(--radius-md)] border border-line bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Hora</span>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={cn(
                          "rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                          time === slot
                            ? "border-primary bg-primary-soft text-primary"
                            : "border-line text-foreground-muted hover:border-primary/40"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-xl font-medium text-foreground">Tus datos</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-[var(--radius-md)] border border-line bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-[var(--radius-md)] border border-line bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-xl font-medium text-foreground">
                Confirma tu cita
              </h3>
              <div className="mt-5 space-y-2 rounded-[var(--radius-md)] bg-surface-muted p-5 text-sm text-foreground-muted">
                <p><span className="font-medium text-foreground">Servicio:</span> {selectedService?.name}</p>
                <p><span className="font-medium text-foreground">Fecha:</span> {date}</p>
                <p><span className="font-medium text-foreground">Hora:</span> {time}</p>
                <p><span className="font-medium text-foreground">Nombre:</span> {name}</p>
                <p><span className="font-medium text-foreground">Teléfono:</span> {phone}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground disabled:opacity-0"
        >
          Atrás
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Confirmar cita
          </button>
        )}
      </div>
    </div>
  );
}
