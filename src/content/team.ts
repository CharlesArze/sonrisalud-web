export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  initials: string;
};

export const team: TeamMember[] = [
  { slug: "armando-apaza", name: "Dr. Armando Apaza", role: "Cirujano Dentista Principal", initials: "AA" },
  { slug: "johana-portugal", name: "Dra. Johana Portugal", role: "Cirujana Dentista Principal", initials: "JP" },
  { slug: "mayreni-alarcon", name: "Dra. Mayreni Alarcón", role: "Cirujana Dentista", initials: "MA" },
  { slug: "adrian-apaza", name: "Dr. Adrián Apaza", role: "Cirujano Dentista", initials: "AA" },
  { slug: "micaela", name: "Dra. Micaela", role: "Odontóloga Asistente", initials: "M" },
];
