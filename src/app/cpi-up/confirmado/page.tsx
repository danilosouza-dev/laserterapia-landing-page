import type { Metadata } from "next";
import ThankYouPage from "@/components/ThankYouPage";

export const metadata: Metadata = {
  title: "Inscrição Confirmada! — Laserterapia para Dentistas",
  description:
    "Sua inscrição foi confirmada! Aproveite a oferta exclusiva das gravações do evento.",
  robots: { index: false, follow: false },
};

export default function CpiUpConfirmadoPage() {
  return <ThankYouPage showRecordings />;
}
