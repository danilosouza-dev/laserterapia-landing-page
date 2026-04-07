"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Puzzle,
  Lightbulb,
  ShieldCheck,
  Trophy,
  Crosshair,
  Crown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    icon: Puzzle,
    text: "Entenda por que o mesmo protocolo funciona perfeitamente em um paciente… e falha no outro.",
  },
  {
    icon: Lightbulb,
    text: "Domine comprimento de onda e destrave seus resultados.",
  },
  {
    icon: ShieldCheck,
    text: "Atenda com a confiança de quem sabe exatamente o que está fazendo — em cada tecido, em cada caso.",
  },
  {
    icon: Trophy,
    text: "Construa uma reputação baseada em resultados rápidos, consistentes e tecnicamente impecáveis.",
  },
  {
    icon: Crosshair,
    text: "Tenha segurança absoluta para escolher, ajustar e prever resultados — sem depender de tentativa e erro.",
  },
  {
    icon: Crown,
    text: "Transforme conhecimento em autoridade e tenha como resultado pacientes que valorizam e pagam mais.",
  },
];

export default function DifferentiatorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".diff-card");

    gsap.set(cards, { y: 60, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        scrollTrigger: {
          trigger: section.querySelector(".diff-list"),
          start: "top 85%",
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".diff-closing", {
        scrollTrigger: {
          trigger: ".diff-closing",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-charcoal)] py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.06)_0%,transparent_65%)]" />
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
        {/* Header — CENTERED */}
        <div className="mb-16 text-center">
          <p className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            Por que este curso
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl mx-auto">
            O que separa quem{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-gold)]">
              domina
            </span>{" "}
            de quem apenas{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-white/30">
              aplica
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="diff-list grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {differentiators.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <div
                key={i}
                className="diff-card bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 md:p-7 flex items-start gap-4 hover:border-[var(--color-laser)]/20 hover:bg-white/[0.07] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-laser)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={20} className="text-[var(--color-laser)]" />
                </div>
                <p className="text-white/75 text-[15px] md:text-base leading-relaxed">
                  {diff.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="diff-closing max-w-3xl mx-auto mt-16 md:mt-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-laser)]/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-[family-name:var(--font-serif)] italic text-white/90 leading-snug mb-4">
              &ldquo;Pare de{" "}
              <span className="text-white/40 line-through decoration-[var(--color-laser)]/60">
                apontar luz.
              </span>{" "}
              Comece a gerar{" "}
              <span className="text-[var(--color-laser)]">
                resposta biológica real.
              </span>
              &rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-white/10" />
              <p className="text-xs text-white/30 font-[family-name:var(--font-mono)] uppercase tracking-[0.2em]">
                Esse é o diferencial do curso
              </p>
              <div className="h-px w-12 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
