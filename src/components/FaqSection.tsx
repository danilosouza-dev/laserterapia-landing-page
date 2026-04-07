"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Para quem é o curso?",
    a: "Para acadêmicos de odontologia e cirurgiões-dentistas que desejam incorporar a laserterapia de baixa potência em sua prática clínica. Não é necessária experiência prévia com laser.",
  },
  {
    q: "Preciso ter equipamento de laser para participar?",
    a: "Não! Todos os equipamentos profissionais serão fornecidos durante a imersão para a prática supervisionada. Ao final, você saberá exatamente qual equipamento adquirir.",
  },
  {
    q: "Qual é a política de cancelamento?",
    a: "Oferecemos reembolso integral até 15 dias antes do evento. Após esse prazo, o valor pode ser transferido para a próxima turma.",
  },
  {
    q: "O que está incluso no investimento?",
    a: "Material didático completo, prática supervisionada com equipamentos profissionais, coffee breaks, certificado de conclusão e acesso ao grupo VIP de alunos.",
  },
  {
    q: "Quantas vagas estão disponíveis?",
    a: "As turmas são reduzidas para garantir qualidade na supervisão prática. Geralmente entre 12 e 30 alunos por turma.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--color-cream-dark)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="text-[var(--color-charcoal)]/80 text-base md:text-lg font-semibold group-hover:text-[var(--color-laser)] transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-[var(--color-charcoal)]/30 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${open ? "max-h-60 pb-6" : "max-h-0"}`}
      >
        <p className="text-[var(--color-charcoal)]/50 text-sm leading-relaxed pr-12">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section
      className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden"
      id="faq"
    >
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.04)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 container-narrow">
        {/* Header — LEFT ALIGNED */}
        <div className="mb-16">
          <p className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--color-charcoal)]">
            Perguntas{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
              frequentes
            </span>
          </h2>
        </div>

        {/* Two-column layout: FAQ left, Support CTA right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          {/* FAQ accordion */}
          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

          {/* Support CTA Card */}
          <div className="lg:sticky lg:top-32">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--color-charcoal)] p-8 md:p-10">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(ellipse_at_top_right,rgba(37,211,102,0.12)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_left,rgba(196,30,30,0.08)_0%,transparent_70%)] pointer-events-none" />

              {/* Brand logo */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/logo.png"
                  alt="Laserterapia para Dentistas"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <p className="text-white font-semibold text-sm">
                  Laserterapia para Dentistas
                </p>
              </div>

              <h3 className="text-white text-xl md:text-2xl font-bold leading-snug mb-3">
                Se ainda estiver com dúvidas, nossa equipe está à disposição
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Tire suas dúvidas diretamente com nosso time. Resposta rápida e sem compromisso.
              </p>

              <a
                href="https://wa.me/SEUNUMEROAQUI"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm md:text-base px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_16px_rgba(37,211,102,0.2)]"
              >
                Falar com o suporte
                {/* WhatsApp icon */}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
