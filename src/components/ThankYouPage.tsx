"use client";

import { useEffect, useRef } from "react";
import { Check, Play, MessageCircle } from "lucide-react";
import gsap from "gsap";

export default function ThankYouPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".ty-header", { y: -30, opacity: 0, duration: 0.6 })
        .from(".ty-steps", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".ty-heading", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".ty-desc", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".ty-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".ty-hero-img", { x: 40, opacity: 0, duration: 0.8 }, "-=0.7")
        .from(
          ".ty-recordings",
          { y: 50, opacity: 0, duration: 0.8 },
          "-=0.3"
        )
        .from(".ty-support", { y: 40, opacity: 0, duration: 0.6 }, "-=0.3");
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0D0D0D] text-white">
      {/* ═══ HEADER ═══ */}
      <header className="ty-header bg-[#141414] border-b border-white/[0.06] py-4">
        <div className="container-narrow flex items-center justify-between">
          {/* Left — Logo + Course Name + Edition */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/logo.png"
              alt="Laserterapia para Dentistas"
              className="w-8 h-8 rounded-full object-cover shrink-0"
              draggable={false}
              style={{ mixBlendMode: "screen" }}
            />
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-white text-sm sm:text-base md:text-lg font-semibold tracking-wide">
                Laserterapia para Dentistas
              </span>
              <span className="hidden sm:inline text-white/20 text-lg">|</span>
              <span className="hidden sm:inline text-white/50 text-sm md:text-base font-[family-name:var(--font-mono)]">
                4ª Edição
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ HERO SECTION — Confirmação + Grupo ═══ */}
      <section className="relative overflow-hidden py-20">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(37,211,102,0.06)_0%,transparent_65%)]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,30,30,0.04)_0%,transparent_65%)]" />
        </div>

        <div className="relative z-10 container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              {/* Step indicators */}
              <div className="ty-steps flex items-center gap-0 mb-10">
                {/* Step 1 — completed */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_12px_rgba(37,211,102,0.3)]">
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[#25D366] text-xs font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider">
                    Etapa 1
                  </span>
                </div>

                {/* Connector line */}
                <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-[#25D366] to-[#25D366]/50 mx-1" />

                {/* Step 2 — current */}
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                  </div>
                  <span className="text-white/60 text-xs font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider">
                    Etapa 2
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="ty-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
                Sua inscrição está quase{" "}
                <span className="text-[#25D366]">concluída!</span>
              </h1>

              {/* Description */}
              <div className="ty-desc space-y-4 mb-8">
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-lg">
                  Aqui você vai ter acesso ao grupo exclusivo de alunos.
                  <strong className="text-white/80"> Entre no grupo de alunos e fique
                  atento às instruções para extrair o melhor dessa imersão.</strong>
                </p>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                  No grupo será passado todo o cronograma, informações importantes,
                  avisos e tira dúvidas sobre o evento presencial.
                </p>
              </div>

              {/* CTA Button */}
              <div className="ty-cta">
                <a
                  href="https://wa.me/SEUNUMEROAQUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base px-8 py-4.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,211,102,0.25)] hover:scale-[1.02]"
                >
                  Finalizar inscrição
                  {/* WhatsApp icon */}
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="ty-hero-img relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/bg-hero.jpeg"
                  alt="Laserterapia"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0D0D0D]/30" />
              </div>
              {/* Decorative glow on image */}
              <div className="absolute -bottom-4 -right-4 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(37,211,102,0.08)_0%,transparent_70%)] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEPARATOR ═══ */}
      <div className="container-narrow">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ═══ RECORDINGS SECTION ═══ */}
      <section className="ty-recordings relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.05)_0%,transparent_65%)]" />
        </div>

        <div className="relative z-10 container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] tracking-tight mb-5">
                As gravações do evento
                <br />
                <span className="text-white/60">não estão inclusas.</span>
              </h2>

              <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-md mb-6">
                No entanto, você pode adquirir separadamente as gravações
                dos 2 dias de evento, em formato de aulas — até o dia 10 de
                Abril (último dia de vendas das gravações).
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-white/50 text-sm mb-1">
                  O preço das gravações é de
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-3xl sm:text-4xl font-bold font-[family-name:var(--font-mono)] tracking-tight">
                    R$997
                  </span>
                </div>
                <p className="text-white/30 text-xs font-[family-name:var(--font-mono)] mt-1">
                  à vista ou em até 12x de R$97,13.
                </p>
              </div>

              {/* CTA */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[var(--color-laser)] hover:bg-[var(--color-laser-light)] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,30,30,0.3)] hover:scale-[1.02]"
              >
                Comprar acesso
              </a>
            </div>

            {/* Right — Recordings visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#1A1A1A] border border-white/[0.06]">
                <img
                  src="/images/mastery-pratica.jpg"
                  alt="Gravações do evento"
                  className="w-full h-full object-cover opacity-80"
                />
                {/* REC indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <span className="text-white text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider">
                    REC
                  </span>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                    <Play
                      size={24}
                      className="text-white ml-1"
                      fill="white"
                    />
                  </div>
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEPARATOR ═══ */}
      <div className="container-narrow">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ═══ SUPPORT SECTION ═══ */}
      <section className="ty-support py-16 md:py-24">
        <div className="container-narrow">
          <div className="max-w-md">
            {/* Support avatar */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-[#25D366]/10">
              <img
                src="/danielle.jpg"
                alt="Suporte"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-3">
              Se precisar de ajuda, toque no
              <br />
              botão abaixo e fale com a Danielle.
            </h3>

            <a
              href="https://wa.me/SEUNUMEROAQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 bg-transparent border border-white/20 hover:border-[#25D366]/50 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 hover:bg-[#25D366]/10"
            >
              Falar com o suporte
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="container-narrow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Laserterapia para Dentistas"
                className="w-7 h-7 rounded-full object-cover"
                style={{ mixBlendMode: "screen" }}
              />
              <div>
                <p className="text-white/40 text-xs">
                  © 2026 Laserterapia para Dentistas.
                </p>
                <p className="text-white/20 text-[10px]">
                  Todos os direitos reservados
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center sm:items-end gap-1">
              <p className="text-white/30 text-[11px] font-[family-name:var(--font-mono)]">
                CNPJ: XX.XXX.XXX/0001-XX
              </p>
              <a
                href="#"
                className="text-white/30 hover:text-white/50 text-[11px] underline underline-offset-2 transition-colors"
              >
                Política de privacidade
              </a>
            </div>
          </div>

          {/* Big watermark brand */}
          <div className="mt-12 overflow-hidden">
            <p
              className="text-[clamp(3rem,12vw,10rem)] font-bold leading-none tracking-tighter text-white/[0.03] select-none whitespace-nowrap"
              aria-hidden="true"
            >
              laserterapia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
