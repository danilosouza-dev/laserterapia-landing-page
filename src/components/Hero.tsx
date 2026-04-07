"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, CalendarDays, MapPin } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 30, opacity: 0, duration: 0.6, delay: 0.3 })
        .from(
          ".hero-subtitle-line",
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.2"
        )
        .from(
          ".hero-title-line",
          { y: 80, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.3"
        )
        .from(".hero-desc", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-cta-area",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(".hero-stats", { y: 30, opacity: 0, duration: 0.7 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden pt-5 sm:pt-6 pb-10 sm:pb-16 md:pb-[98px]"
      id="hero"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <img
          src="/bg-hero.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[60%_20%] md:object-[55%_20%] xl:object-center"
          draggable={false}
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* ═══ TOP BAR: Logo + Event Info ═══ */}
      <div className="relative z-10 container-narrow w-full">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2">

          {/* Logo + Brand */}
          <div className="hero-badge flex items-center gap-1.5 shrink-0">
            <img
              src="/logo.png"
              alt="Laserterapia para Dentistas"
              className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full shrink-0"
              draggable={false}
              style={{ mixBlendMode: "screen" }}
            />
            <span className="text-white text-[10px] sm:text-xs md:text-base font-semibold tracking-wide drop-shadow-lg leading-tight">
              Laserterapia para Dentistas
            </span>
          </div>

          {/* Event Info */}
          <div className="hero-badge flex flex-col items-center sm:items-end gap-1">

            {/* Pill — date + location */}
            <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-[var(--color-gold)]/60 rounded-full px-2.5 py-1.5 md:px-4 md:py-2">
              <CalendarDays size={10} className="text-[var(--color-gold)] shrink-0" />
              <span className="text-[var(--color-gold)] text-[10px] md:text-xs font-[family-name:var(--font-mono)] font-semibold tracking-wider whitespace-nowrap">
                22 E 23 DE MAIO 2026
              </span>
              <span className="text-white/50">·</span>
              <MapPin size={10} className="text-white/70 shrink-0" />
              <span className="text-white/80 text-[9px] md:text-xs font-[family-name:var(--font-mono)] whitespace-nowrap">
                PORTO ALEGRE — RS
              </span>
            </div>

            {/* Subtitle — sm+ only */}
            <p className="hero-subtitle-line text-white/70 text-[11px] md:text-xs font-[family-name:var(--font-mono)] font-medium tracking-[0.15em] uppercase hidden sm:block">
              Curso Presencial Imersivo · 2 Dias
            </p>
          </div>

        </div>
      </div>

      {/* ═══ SPACER — pushes bottom content down ═══ */}
      <div className="flex-1 min-h-12 sm:min-h-8 max-h-[12vh] sm:max-h-[15vh] lg:max-h-none" />

      {/* ═══ BOTTOM CONTENT: Text Wrapper (left) + Glass Card (right) ═══ */}
      <div className="relative z-10 container-narrow w-full">
        <div className="flex flex-col items-start xl:flex-row xl:items-end gap-8 xl:gap-16">

          {/* ── LEFT: Text Wrapper (headline + desc + CTA + progress) ── */}
          <div className="flex-1">
            {/* Headline */}
            <div className="max-w-4xl mb-6 sm:mb-8">
              <h1 className="font-extrabold tracking-tight leading-[0.9]">
                <span className="hero-title-line block text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight">Dentista, domine a</span>
                <span className="hero-title-line hero-laser-word block font-[family-name:var(--font-serif)] italic text-[3rem] sm:text-[3.8rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[7.5rem] 2xl:text-[10rem] leading-[0.85] mt-1 text-shimmer">
                  Laserterapia.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="hero-desc text-white/60 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 sm:mb-10">
              Dosimetria exata. Protocolos clínicos validados cientificamente. Casos
              reais.{" "}
              <span className="text-white font-medium">
                Tudo o que separa o sucesso do fracasso no laser.
              </span>
            </p>

            {/* CTA + Progress */}
            <div className="hero-cta-area flex flex-col items-start gap-3">
              <a
                href="#investimento"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("investimento")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-magnetic bg-[var(--color-laser)] text-white font-semibold text-sm tracking-wider py-4 rounded-sm flex items-center justify-center gap-3 uppercase w-full sm:w-[385px] sm:max-w-full"
              >
                <span>Garantir Minha Vaga</span>
              </a>
              <div className="flex items-center gap-3 w-full sm:w-[385px] sm:max-w-full">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-laser)] rounded-full"
                    style={{ width: "91%" }}
                  />
                </div>
                <span className="text-white/70 text-xs font-[family-name:var(--font-mono)] whitespace-nowrap">
                  91% das vagas preenchidas
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Glassmorphic Info Card ── */}
          <div className="hero-stats w-full xl:w-[380px] 2xl:w-[400px] shrink-0">
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
              {/* Info rows */}
              <div className="divide-y divide-white/[0.06]">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    title: "20h de conteúdo intensivo",
                    desc: "Teoria + prática em 2 dias de imersão",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                        <path d="M9.5 2a3 3 0 0 0-3 3v1h11V5a3 3 0 0 0-3-3h-5Z" />
                        <path d="M5.5 7l1 13a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2l1-13h-13Z" />
                        <path d="M10 11v6M14 11v6" />
                      </svg>
                    ),
                    title: "Protocolos clínicos validados",
                    desc: "Dosimetria precisa para aplicar com segurança já no primeiro atendimento",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ),
                    title: "Certificação de 20 horas",
                    desc: "Reconhecido para valorizar seu currículo",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 px-5 py-4"
                  >
                    <div className="text-[var(--color-gold)]/80 mt-0.5 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">
                        {item.title}
                      </p>
                      <p className="text-white/45 text-xs mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Student avatars + count */}
              <div className="flex items-center gap-3 px-5 py-4 border-t border-white/[0.06] bg-white/[0.03]">
                <div className="flex -space-x-3.5">
                  {[
                    "/depoimentos/01/avatar.jpeg",
                    "/depoimentos/02/avatar.jpeg",
                    "/depoimentos/03/avatar.jpeg",
                    "/depoimentos/04/avatar.jpeg",
                    "/depoimentos/05/avatar.jpeg",
                    "/depoimentos/06/avatar.jpeg",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-black/40 object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">
                    +100 Alunos
                  </p>
                  <p className="text-white/40 text-[11px] leading-tight">
                    já formados em laserterapia
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
