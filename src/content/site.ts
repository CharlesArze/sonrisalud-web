export const site = {
  name: "Sonrisalud",
  tagline: "Cuidado dental excepcional",
  description:
    "Una clínica dental con visión de futuro en Arequipa: tratamiento individualizado, odontología de vanguardia y profesionales con experiencia.",
  phone: "+51 988 918 469",
  phoneHref: "tel:+51988918469",
  whatsapp: "51988918469",
  whatsappHref: "https://wa.me/51988918469",
  email: "contacto@sonrisalud.net",
  address: "Coop Daniel Alcides Carrión B1, José Luis Bustamante y Rivero, Arequipa",
  hours: "Lunes a sábado, 9:00 am – 7:00 pm",
  social: {
    facebook: "https://facebook.com/SonriSaludPeru",
    instagram: "https://instagram.com/sonrisalud_aqp",
  },
  stats: [
    { value: "15+", label: "Años de experiencia" },
    { value: "300+", label: "Clientes felices" },
    { value: "100%", label: "Atención personalizada" },
    { value: "6+", label: "Servicios diferentes" },
  ],
  pillars: [
    {
      title: "Tratamiento individualizado",
      description:
        "Cada plan de tratamiento se adapta a las necesidades únicas de cada paciente.",
    },
    {
      title: "Odontología de vanguardia",
      description:
        "Tecnología avanzada para diagnósticos precisos y resultados duraderos.",
    },
    {
      title: "Experiencia profesional",
      description:
        "Un equipo que combina años de trayectoria con un trato genuinamente humano.",
    },
  ],
} as const;

export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/about" },
  { label: "Servicios", href: "/services" },
  { label: "Equipo", href: "/equipo" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Contacto", href: "/contact" },
] as const;
