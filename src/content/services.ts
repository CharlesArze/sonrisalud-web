export type Service = {
  slug: string;
  number: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "General" | "Estética" | "Especialidad";
  highlights: string[];
  image: string;
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
    image: "/service-ortodoncia.png",
  },
  {
    slug: "estetica-dental",
    number: "02",
    name: "Estética Dental",
    shortDescription: "Carillas, uniones y soluciones estéticas dentales.",
    description:
      "Diseñamos sonrisas con carillas de porcelana, resinas estéticas y otros tratamientos enfocados en armonía y naturalidad.",
    category: "Estética",
    highlights: ["Diseño de sonrisa", "Carillas de porcelana", "Resinas estéticas"],
    image: "/service-estetica-dental.png",
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
    image: "/service-implantes-dentales.png",
  },
];
