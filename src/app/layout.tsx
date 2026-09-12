import type { Metadata } from "next";
import { Manrope, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

/* Manrope sigue siendo la tipografía de los títulos grandes (sin tocar).
   Geist reemplaza a Manrope solo en el texto de contenido: es la misma
   tipografía que usa cluely.com en todo su texto (nav, párrafos,
   botones), confirmada inspeccionando sus estilos computados — no la
   de su titular central, que es una serif aparte (EB Garamond). */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonrisalud | Clínica Dental en Arequipa",
  description:
    "Cuidado dental excepcional en Arequipa: ortodoncia, estética dental e implantes dentales. Reserva tu cita hoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${geist.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
