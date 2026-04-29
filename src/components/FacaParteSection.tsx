import { ArrowRight, MapPin, CalendarDays } from "lucide-react";

export default function FacaParteSection() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-white">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(196,30,30,0.06)_0%,transparent_65%)]" />
      </div>

      <div className="container-narrow relative z-10 text-center">
        <p className="text-[var(--color-charcoal)]/40 text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-6">
          Faça parte
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.1] text-[var(--color-charcoal)]">
          Transforme sua{" "}
          <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
            prática clínica
          </span>
        </h2>
        <p className="text-[var(--color-charcoal)]/50 text-lg max-w-lg mx-auto mb-10">
          Junte-se aos dentistas que já dominam a laserterapia e oferecem o
          melhor para seus pacientes.
        </p>

        {/* CTA Button — same style as Hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="https://wa.me/5545999667049?text=Quero%20garantir%20minha%20vaga%20no%20curso%20de%20Laserterapia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic bg-[var(--color-laser)] text-white font-semibold text-sm tracking-wider px-10 py-4 rounded-sm flex items-center gap-3 uppercase shadow-lg shadow-[var(--color-laser)]/20"
          >
            <span>INSCREVA-SE AGORA</span>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Event info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[var(--color-charcoal)]/40 text-xs font-[family-name:var(--font-mono)]">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} /> 22 e 23 de Maio 2026
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> Porto Alegre, RS
          </span>
        </div>
      </div>
    </section>
  );
}
