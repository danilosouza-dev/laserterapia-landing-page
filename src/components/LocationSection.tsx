"use client";

import { MapPin, Navigation } from "lucide-react";

export default function LocationSection() {
  return (
    <section
      className="relative bg-[var(--color-charcoal)] py-24 md:py-32 overflow-hidden"
      id="local"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.06)_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            Local do Evento
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Onde acontece
          </h2>
        </div>

        {/* Location card */}
        <div className="bg-white/[0.04] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/[0.08] max-w-3xl mx-auto">
          {/* Map */}
          <div className="relative h-64 md:h-80 bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.5!2d-51.1758!3d-30.0346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPorto+Alegre+-+RS!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Localização do Curso — Porto Alegre RS"
            />
          </div>

          {/* Info */}
          <div className="p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-laser)]/10 flex items-center justify-center shrink-0">
                <MapPin size={22} className="text-[var(--color-laser)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Logos Cursos e Pós-Graduação
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Rua Presidente Bernardes, 1650
                  <br />
                  Porto Alegre — RS
                  <br />
                  Contato: (45) 99107-9680
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/40 text-sm font-[family-name:var(--font-serif)] italic">
              <Navigation size={14} />
              <span>
                &ldquo;Excelência e paixão pelo ensino nos faz ir além.&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

