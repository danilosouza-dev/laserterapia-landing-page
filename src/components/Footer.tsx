"use client";

import { AtSign, MessageCircle, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Professores", href: "#professores" },
  { label: "Programa", href: "#programa" },
  { label: "Investimento", href: "#investimento" },
  { label: "Local", href: "#local" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal)] rounded-t-[3rem] md:rounded-t-[4rem] pt-16 pb-8">
      <div className="container-narrow">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Laserterapia para Dentistas"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-white font-semibold text-sm">
                  Laserterapia para Dentistas
                </p>
                <p className="text-white/30 text-xs">
                  Laserterapia para Dentistas
                </p>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Capacitando cirurgiões-dentistas com conhecimento científico sólido
              em laserterapia de baixa potência.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-[family-name:var(--font-mono)]">
              Navegação
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & status */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-[family-name:var(--font-mono)]">
              Contato
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="https://wa.me/5545999667049"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors"
              >
                <AtSign size={16} />
                <span>Instagram</span>
              </a>
            </div>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-green-400/80 text-xs font-[family-name:var(--font-mono)]">
                Inscrições Abertas
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 Laserterapia para Dentistas. Todos os direitos reservados.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
