"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  BookOpen,
  FlaskConical,
  Award,
  Users,
  Headphones,
  CalendarDays,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Clock, text: "20h de conteúdo intensivo" },
  { icon: BookOpen, text: "Protocolos clínicos validados" },
  { icon: FlaskConical, text: "Prática supervisionada" },
  { icon: Award, text: "Certificado de conclusão (20h)" },
  { icon: Users, text: "Turma reduzida e exclusiva" },
  { icon: Headphones, text: "Suporte pós-curso" },
];

const bonuses = [
  "Material didático completo",
  "Acesso ao grupo VIP de alunos",
  "Bônus: Guia de protocolos clínicos",
  "Coffee breaks inclusos",
];

export default function InvestmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".invest-ticket", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".invest-ticket",
          start: "top 80%",
        },
      });
      gsap.from(".invest-feature", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".invest-feature",
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden"
      id="investimento"
    >
      {/* Subtle gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 container-narrow">
        {/* Header — CENTERED */}
        <div className="text-center mb-16">
          <p className="text-[var(--color-gold)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            Investimento
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-charcoal)] leading-[1.1] tracking-tight">
            Seu investimento se paga em{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-gold)]">
              poucos dias
            </span>
          </h2>
          <p className="text-[var(--color-charcoal)]/40 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-serif)] italic">
            Ter um bom equipamento sem domínio técnico não eleva seu nível —{" "}
            <span className="text-[var(--color-laser)] font-medium not-italic">
              expõe suas limitações.
            </span>
          </p>
        </div>


        {/* ═══ TICKET CARD ═══ */}
        <div className="invest-ticket max-w-5xl mx-auto">
          {/*
            Ticket structure (like the reference):
            ┌──────────┬╌╌╌┬────────────────────────────┬╌╌╌┬──────┐
            │          │   │  Logo + Date                │   │ |||  │
            │  IMAGE   │   │  3 description pills        │   │ |||  │
            │          │   │  De / Por price              │   │ |||  │
            │          │   │  CTA Button                  │   │ |||  │
            │          │   │  Progress bar                │   │ BAR  │
            └──────────┴╌╌╌┴────────────────────────────┴╌╌╌┴──────┘
          */}
          <div
            className="ticket-outer relative bg-white overflow-hidden"
            style={{
              borderRadius: "16px",
              boxShadow:
                "0 8px 60px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)",
            }}
          >

            <div className="flex flex-col md:flex-row min-h-[420px] lg:min-h-[460px]">
              {/* ── LEFT: Image ── */}
              <div className="relative w-full md:w-[260px] lg:w-[300px] shrink-0 min-h-[220px] md:min-h-full overflow-hidden bg-[var(--color-charcoal)]">
                <img
                  src="/IMG_5449.PNG"
                  alt="Laserterapia dental"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-black/35" />
                {/* Logo top-left on image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="Laserterapia para Dentistas"
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                  />
                  <span className="text-white text-xs font-semibold tracking-wide drop-shadow-lg">
                    Laserterapia para Dentistas
                  </span>
                </div>
              </div>

              {/* ── Perforation LEFT (between image and content) — no notches on image side ── */}
              <div className="ticket-perf-v hidden md:block relative w-[1px] shrink-0">
                {/* Dashed line only — no cutout notches near the image */}
                <div className="absolute top-[16px] bottom-[16px] left-1/2 -translate-x-1/2 w-0 border-l-[2px] border-dashed border-[var(--color-cream-dark)]/80" />
              </div>

              <div className="ticket-perf-h flex md:hidden relative h-[1px] w-full shrink-0">
                <div className="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 h-0 border-t-[2px] border-dashed border-[var(--color-cream-dark)]/80" />
              </div>

              {/* ── CENTER: Content ── */}
              <div className="flex-1 py-7 md:py-8 px-6 sm:px-8 lg:px-10 flex flex-col">
                {/* Row 1: Date + location positioned to the left */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="inline-flex items-center gap-1.5">
                    <CalendarDays
                      size={13}
                      className="text-[var(--color-charcoal)]/40"
                    />
                    <span className="text-[var(--color-charcoal)]/50 text-[11px] font-[family-name:var(--font-mono)] tracking-wider">
                      22 e 23 de Maio
                    </span>
                  </div>
                  <span className="text-[var(--color-charcoal)]/20">·</span>
                  <div className="inline-flex items-center gap-1">
                    <MapPin
                      size={12}
                      className="text-[var(--color-charcoal)]/40"
                    />
                    <span className="text-[var(--color-charcoal)]/50 text-[11px] font-[family-name:var(--font-mono)]">
                      Porto Alegre — RS · Presencial
                    </span>
                  </div>
                </div>

                {/* Row 2: Three description pills (like the reference) */}
                <div className="flex flex-col md:flex-row gap-[1px] mb-6">
                  <div className="flex-1 md:border-r border-b md:border-b-0 border-[var(--color-cream-dark)] md:pr-4 pb-3 md:pb-2 md:py-2">
                    <p className="text-[var(--color-charcoal)]/60 text-xs leading-snug">
                      20h de conteúdo intensivo com protocolos clínicos
                      validados.
                    </p>
                  </div>
                  <div className="flex-1 md:border-r border-b md:border-b-0 border-[var(--color-cream-dark)] md:px-4 pb-3 md:pb-2 md:py-2">
                    <p className="text-[var(--color-charcoal)]/60 text-xs leading-snug">
                      Prática supervisionada. Sem precisar de experiência
                      prévia.
                    </p>
                  </div>
                  <div className="flex-1 md:pl-4 py-2">
                    <p className="text-[var(--color-charcoal)]/60 text-xs leading-snug">
                      Certificado de 20h e suporte pós-curso até 1 ano.
                    </p>
                  </div>
                </div>

                {/* Row 3: Pricing — De / Por (exactly like the reference) */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[var(--color-charcoal)]/30 text-sm font-[family-name:var(--font-serif)] italic">
                      De
                    </span>
                    <span className="text-[var(--color-charcoal)]/30 text-xl line-through font-[family-name:var(--font-mono)] decoration-[var(--color-laser)]/40">
                      R$ 3.247
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-[var(--color-charcoal)]/40 text-sm font-[family-name:var(--font-serif)] italic pb-2">
                      Por
                    </span>
                    <span className="text-[var(--color-charcoal)] text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold font-[family-name:var(--font-mono)] leading-none tracking-tighter">
                      R$ 2.247
                    </span>
                  </div>
                  <p className="text-[var(--color-charcoal)]/35 text-xs mt-1.5 font-[family-name:var(--font-mono)]">
                    ou 5x de R$ 529,40
                  </p>
                </div>

                {/* Row 4: CTA button */}
                <a
                  href="https://wa.me/5583999999999?text=Quero%20garantir%20minha%20vaga%20no%20curso%20de%20Laserterapia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic bg-[var(--color-laser)] text-white font-semibold text-sm tracking-wider px-8 py-4 rounded-sm flex items-center justify-center gap-3 uppercase w-full"
                >
                  <span>GARANTIR MINHA VAGA</span>
                </a>

                {/* Row 5: Progress bar */}
                <div className="flex items-center justify-between mt-3 w-full">
                  <div className="flex-1 h-2 bg-[var(--color-cream-dark)] rounded-full overflow-hidden mr-4">
                    <div
                      className="h-full bg-[var(--color-laser)] rounded-full"
                      style={{ width: "91%" }}
                    />
                  </div>
                  <span className="text-[var(--color-charcoal)]/50 text-xs font-[family-name:var(--font-mono)] whitespace-nowrap">
                    91% das vagas preenchidas
                  </span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Row 6: Bonuses at bottom */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-5 pt-5 border-t border-[var(--color-cream-dark)]">
                  {bonuses.map((bonus, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[var(--color-charcoal)]/50 text-[11px]"
                    >
                      <Check
                        size={11}
                        className="text-emerald-500 shrink-0"
                      />
                      <span>{bonus}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Perforation RIGHT (between content and barcode) — bigger notches ── */}
              <div className="ticket-perf-v hidden md:block relative w-[1px] shrink-0">
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[30px] h-[15px] bg-[var(--color-cream)] rounded-b-full z-10" />
                <div className="absolute top-[20px] bottom-[20px] left-1/2 -translate-x-1/2 w-0 border-l-[2px] border-dashed border-[var(--color-cream-dark)]/80" />
                <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[30px] h-[15px] bg-[var(--color-cream)] rounded-t-full z-10" />
              </div>

              {/* ── RIGHT: Barcode strip — horizontal bars stacked vertically like reference ── */}
              <div className="hidden md:flex flex-col items-center justify-center w-[80px] lg:w-[90px] shrink-0 bg-white py-5 px-3">
                <div className="flex-1 w-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 50 400"
                    className="h-[85%] w-[44px]"
                    preserveAspectRatio="none"
                  >
                    {/* Horizontal bars stacked vertically — like a rotated barcode */}
                    {(() => {
                      const bars: { y: number; h: number }[] = [];
                      // Pattern: bar thickness alternating with gap thickness
                      const pattern = [
                        6, 2, 3, 1, 8, 2, 2, 1, 5, 3, 3, 1, 7, 2, 2, 2,
                        4, 1, 6, 2, 3, 1, 9, 2, 2, 1, 4, 3, 5, 1, 3, 2,
                        7, 1, 2, 2, 6, 1, 4, 2, 8, 1, 3, 2, 5, 1, 2, 3,
                        7, 2, 3, 1, 6, 2, 4, 1, 2, 2, 8, 1, 3, 2, 5, 1,
                        6, 2, 2, 1, 7, 3, 3, 1, 4, 2, 6, 1, 2, 2, 5, 2,
                        8, 1, 3, 2, 4, 1, 7, 2, 2, 1, 5, 2, 3, 1, 6, 2,
                        4, 1, 8, 2, 2, 1, 3, 3, 6, 1, 5, 2, 2, 1, 7, 2,
                        3, 1, 4, 2, 6, 1, 2, 3, 5, 1, 8, 2, 3, 1, 4, 2,
                      ];
                      let y = 0;
                      pattern.forEach((h, i) => {
                        if (i % 2 === 0) bars.push({ y, h });
                        y += h;
                      });
                      const totalH = y;
                      const scale = 400 / totalH;
                      return bars.map((bar, i) => (
                        <rect
                          key={i}
                          x="0"
                          y={bar.y * scale}
                          width="50"
                          height={Math.max(bar.h * scale, 0.5)}
                          fill="#3D4F5F"
                          opacity={0.85}
                        />
                      ));
                    })()}
                  </svg>
                </div>
              </div>

              {/* ── MOBILE: Bottom barcode strip ── */}
              <div className="flex md:hidden relative h-[1px] w-full shrink-0">
                <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[12px] h-[24px] bg-[var(--color-cream)] rounded-r-full z-10" />
                <div className="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 h-0 border-t-[2px] border-dashed border-[var(--color-cream-dark)]/80" />
                <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[12px] h-[24px] bg-[var(--color-cream)] rounded-l-full z-10" />
              </div>
              <div className="flex md:hidden items-center justify-center px-6 py-4 bg-white">
                <svg
                  viewBox="0 0 400 50"
                  className="w-full h-[30px]"
                  preserveAspectRatio="none"
                >
                  {/* Mobile: vertical bars (standard barcode orientation) */}
                  {(() => {
                    const bars: { x: number; w: number }[] = [];
                    const pattern = [
                      6, 2, 3, 1, 8, 2, 2, 1, 5, 3, 3, 1, 7, 2, 2, 2,
                      4, 1, 6, 2, 3, 1, 9, 2, 2, 1, 4, 3, 5, 1, 3, 2,
                      7, 1, 2, 2, 6, 1, 4, 2, 8, 1, 3, 2, 5, 1, 2, 3,
                      7, 2, 3, 1, 6, 2, 4, 1, 2, 2, 8, 1, 3, 2, 5, 1,
                      6, 2, 2, 1, 7, 3, 3, 1, 4, 2, 6, 1, 2, 2, 5, 2,
                      8, 1, 3, 2, 4, 1, 7, 2, 2, 1, 5, 2, 3, 1, 6, 2,
                      4, 1, 8, 2, 2, 1, 3, 3, 6, 1, 5, 2, 2, 1, 7, 2,
                      3, 1, 4, 2, 6, 1, 2, 3, 5, 1, 8, 2, 3, 1, 4, 2,
                    ];
                    let x = 0;
                    pattern.forEach((w, i) => {
                      if (i % 2 === 0) bars.push({ x, w });
                      x += w;
                    });
                    const total = x;
                    const scale = 400 / total;
                    return bars.map((bar, i) => (
                      <rect
                        key={i}
                        x={bar.x * scale}
                        y="0"
                        width={Math.max(bar.w * scale, 0.8)}
                        height="50"
                        fill="#3D4F5F"
                        opacity={0.85}
                      />
                    ));
                  })()}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
