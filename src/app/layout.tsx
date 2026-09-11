import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

/* Instrument Serif solo para los títulos (h1/h2/h3) — ver la
   regla en globals.css que la aplica exclusivamente ahí. */
const instrumentSerif = localFont({
  variable: "--font-instrument-serif",
  src: [
    { path: "../fonts/instrument-serif/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Sonrisalud | Clínica Dental en Arequipa",
  description:
    "Cuidado dental excepcional en Arequipa: ortodoncia, blanqueamiento, implantes, odontopediatría y estética dental. Reserva tu cita hoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${instrumentSerif.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
