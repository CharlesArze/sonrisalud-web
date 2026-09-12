"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { site } from "@/content/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-line bg-surface p-10 text-center">
        <Image
          src="/logo.jpg"
          alt={site.name}
          width={366}
          height={223}
          className="h-14 w-auto object-contain"
        />
        <h3 className="mt-4 font-display text-2xl font-medium text-foreground">
          ¡Gracias por escribirnos!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-foreground-muted">
          Este es un prototipo visual: tu mensaje no se envía realmente, pero así se vería la
          confirmación. Nuestro equipo te contactará en menos de 24 horas.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" id="firstName" required />
        <Field label="Apellidos" id="lastName" required />
        <Field label="Teléfono / WhatsApp" id="phone" type="tel" required />
        <Field label="Correo electrónico" id="email" type="email" required />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Cuéntanos tu consulta
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-[var(--radius-md)] border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm text-foreground-muted">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-line text-primary" />
        Acepto que Sonrisalud me contacte y trate mis datos según su política de privacidad.
      </label>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto"
      >
        Enviar mensaje
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-[var(--radius-md)] border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
