export type Service = {
  slug: string;
  number: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "General" | "Estética" | "Especialidad";
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "ortodoncia",
    number: "01",
    name: "Ortodoncia",
    shortDescription:
      "Enderece sus dientes y mejore su mordida con aparatos personalizados o alineadores transparentes.",
    description:
      "Corregimos la posición de tus dientes y tu mordida con brackets tradicionales o alineadores transparentes, adaptando el tratamiento a tu ritmo de vida y objetivos estéticos.",
    category: "Especialidad",
    highlights: ["Brackets metálicos y estéticos", "Alineadores transparentes", "Seguimiento mensual"],
  },
  {
    slug: "blanqueamiento-dental",
    number: "02",
    name: "Blanqueamiento Dental",
    shortDescription:
      "Ilumina tu sonrisa con tratamientos de blanqueamiento profesionales, seguros y efectivos.",
    description:
      "Aclaramos el tono de tus dientes con procedimientos profesionales supervisados por especialistas, cuidando el esmalte y la sensibilidad dental.",
    category: "Estética",
    highlights: ["Blanqueamiento en consultorio", "Kits de mantenimiento", "Resultados visibles desde la primera sesión"],
  },
  {
    slug: "implantes-dentales",
    number: "03",
    name: "Implantes Dentales",
    shortDescription:
      "Soluciones permanentes de aspecto natural que restauran función y apariencia.",
    description:
      "Reemplazamos piezas dentales perdidas con implantes de titanio biocompatibles, devolviendo la función masticatoria y una apariencia completamente natural.",
    category: "Especialidad",
    highlights: ["Evaluación 3D", "Implantes unitarios y múltiples", "Garantía de tratamiento"],
  },
  {
    slug: "cuidado-preventivo",
    number: "04",
    name: "Cuidado Preventivo",
    shortDescription: "Revisiones regulares, limpiezas e higiene bucal personalizada.",
    description:
      "Programas de chequeo y limpieza dental periódica para detectar a tiempo caries, gingivitis y otros problemas antes de que se compliquen.",
    category: "General",
    highlights: ["Limpieza profesional", "Diagnóstico digital", "Plan de higiene personalizado"],
  },
  {
    slug: "odontopediatria",
    number: "05",
    name: "Odontopediatría",
    shortDescription: "Atención amable y segura adaptada para niños.",
    description:
      "Cuidado dental especializado para los más pequeños, en un ambiente cómodo y familiar que reduce el miedo al dentista desde la primera visita.",
    category: "General",
    highlights: ["Consultorio family-friendly", "Selladores dentales", "Educación en higiene infantil"],
  },
  {
    slug: "estetica-dental",
    number: "06",
    name: "Estética Dental",
    shortDescription: "Carillas, uniones y soluciones estéticas dentales.",
    description:
      "Diseñamos sonrisas con carillas de porcelana, resinas estéticas y otros tratamientos enfocados en armonía y naturalidad.",
    category: "Estética",
    highlights: ["Diseño de sonrisa", "Carillas de porcelana", "Resinas estéticas"],
  },
];

export const featuredServiceSlugs = ["ortodoncia", "estetica-dental", "implantes-dentales"];
