import type { Metadata } from "next";
import ThankYouPage from "@/components/ThankYouPage";

export const metadata: Metadata = {
  title: "Obrigado! — Laserterapia para Dentistas",
  description:
    "Sua inscrição foi confirmada! Siga os próximos passos para acessar o grupo e aproveitar ao máximo o curso presencial de Laserterapia.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return <ThankYouPage />;
}
