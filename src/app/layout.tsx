import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Laserterapia para Dentistas — Curso Presencial Imersivo | Laser Dentistry",
  description:
    "Domine a laserterapia de baixa potência na odontologia. Curso presencial de 2 dias com protocolos clínicos, dosimetria exata e casos reais. 22 e 23 de Maio 2026 — Porto Alegre, RS.",
  keywords: [
    "laserterapia",
    "curso de laser para dentista",
    "laser de baixa potência",
    "fotobiomodulação",
    "odontologia",
    "curso presencial",
  ],
  openGraph: {
    title: "Laserterapia para Dentistas — Curso Presencial Imersivo",
    description:
      "Domine a laserterapia de baixa potência. Protocolos clínicos reais. 22 e 23 de Maio 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${cormorant.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="noise-overlay grid-overlay min-h-full flex flex-col">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
