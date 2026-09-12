export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    slug: "armando-apaza",
    name: "Dr. Armando Apaza",
    role: "Cirujano Dentista Principal",
    initials: "AA",
    photo: "/team-armando-apaza.jpg",
  },
  {
    slug: "johana-portugal",
    name: "Dra. Johana Portugal",
    role: "Cirujana Dentista Principal",
    initials: "JP",
    photo: "/team-johana-portugal.jpg",
  },
  {
    slug: "mayreni-alarcon",
    name: "Dra. Mayreni Alarcón",
    role: "Cirujana Dentista",
    initials: "MA",
    photo: "/team-mayreni-alarcon.jpg",
  },
  {
    slug: "adrian-apaza",
    name: "Dr. Adrián Apaza",
    role: "Cirujano Dentista",
    initials: "AA",
    photo: "/team-adrian-apaza.jpg",
  },
  {
    slug: "micaela",
    name: "Dra. Micaela",
    role: "Odontóloga Asistente",
    initials: "M",
    photo: "/team-micaela.jpg",
  },
];
