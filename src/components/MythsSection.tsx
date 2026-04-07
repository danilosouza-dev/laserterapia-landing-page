"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const myths = [
  {
    number: "01",
    myth: "Laser \u00e9 caro demais para o meu consult\u00f3rio",
    truth:
      "Um fotopolimerizador de LED custa R$10\u201312 mil e s\u00f3 serve para uma coisa. O laser custa R$7 mil e atende todas as especialidades. Ele s\u00f3 parece caro quando voc\u00ea n\u00e3o sabe us\u00e1-lo.",
  },
  {
    number: "02",
    myth: "A ci\u00eancia n\u00e3o comprova",
    truth:
      "Comprova sim \u2014 para indica\u00e7\u00f5es espec\u00edficas, com protocolo espec\u00edfico. Diretrizes da MASCC/ISOO j\u00e1 recomendam fotobiomodula\u00e7\u00e3o. O erro \u00e9 tratar como solu\u00e7\u00e3o universal sem dom\u00ednio t\u00e9cnico.",
  },
  {
    number: "03",
    myth: "Cada profissional faz de um jeito",
    truth:
      "Exatamente. E esse \u00e9 o problema. Sem protocolo padronizado, dois dentistas fazem \u2018laserterapia\u2019 e entregam resultados opostos. Quem domina a dosimetria, padroniza os resultados.",
  },
  {
    number: "04",
    myth: "J\u00e1 usei e n\u00e3o vi resultado nenhum",
    truth:
      "Experi\u00eancia cl\u00ednica ruim nasce de uso ruim. A ADA j\u00e1 documentou: a l\u00f3gica de \u2018apontar e disparar\u2019 \u00e9 o principal motivo de frustra\u00e7\u00e3o. O laser funciona. O protocolo \u00e9 que faltou.",
  },
  {
    number: "05",
    myth: "N\u00e3o consigo justificar o custo pro paciente",
    truth:
      "Porque o problema \u00e9 comunica\u00e7\u00e3o, n\u00e3o valor. O custo do laser j\u00e1 vai embutido no tratamento: uma cirurgia de R$1.000 vira R$1.200 com laser incluso. Quem explica o benef\u00edcio, vende sem esfor\u00e7o.",
  },
  {
    number: "06",
    myth: "Nunca tive um treinamento que prestasse",
    truth:
      "Esse \u00e9 o gargalo real. 80% dos dentistas conhecem o laser, mas s\u00f3 15% usam de verdade. O que falta \u00e9 um curso que transforme interesse em compet\u00eancia cl\u00ednica.",
  },
];

export default function MythsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".myths-heading", {
        scrollTrigger: {
          trigger: ".myths-heading",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".myths-counter", {
        scrollTrigger: {
          trigger: ".myths-counter",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.utils.toArray<HTMLElement>(".myth-row").forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.06,
          ease: "power3.out",
        });
      });

      gsap.from(".myths-bottom", {
        scrollTrigger: {
          trigger: ".myths-bottom",
          start: "top 92%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-charcoal)] py-28 md:py-40 overflow-hidden"
      id="mitos"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=40"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.08)_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container-narrow">
        {/* ── Tag centered ── */}
        <div className="myths-heading flex justify-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-laser)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-laser)]" />
            </span>
            <span className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.15em] uppercase">
              Mitos vs realidade
            </span>
          </div>
        </div>

        {/* ── Two-column: Text left, Stats right ── */}
        <div className="myths-heading flex flex-col lg:flex-row lg:justify-between items-start gap-10 mb-20 md:mb-24">
          {/* Left — Text content */}
          <div className="flex-1 max-w-full lg:max-w-[48%]">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              O que{" "}
              <span className="relative inline-block">
                <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
                  ningu&eacute;m
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 3 Q25 0 50 3 Q75 6 100 3"
                    fill="none"
                    stroke="var(--color-laser)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>{" "}
              te contou{" "}
              <br className="hidden md:block" />
              sobre laserterapia
            </h2>

            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              A resist&ecirc;ncia &agrave; laserterapia n&atilde;o &eacute;
              preconceito. &Eacute;{" "}
              <span className="text-white/80 font-medium">
                falta de protocolo claro, dificuldade em comunicar os
                benef&iacute;cios ao paciente e aus&ecirc;ncia de treinamento
                que realmente prepare.
              </span>{" "}
              Esses s&atilde;o os obst&aacute;culos reais &mdash; e todos
              t&ecirc;m solu&ccedil;&atilde;o.
            </p>
          </div>

          {/* Right — Glassmorphic Stats Card */}
          <div className="myths-counter w-full lg:w-[380px] xl:w-[400px] shrink-0">
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {[
                  {
                    value: "80%",
                    title: "Conhecem o laser",
                    desc: "Mas poucos realmente dominam a t\u00e9cnica",
                  },
                  {
                    value: "15%",
                    title: "Aplicam na cl\u00ednica",
                    desc: "Apenas uma fra\u00e7\u00e3o usa de forma consistente",
                  },
                  {
                    value: "57%",
                    title: "Sem treinamento real",
                    desc: "Nunca tiveram capacita\u00e7\u00e3o pr\u00e1tica adequada",
                  },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-4 px-5 py-4">
                    <span className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-mono)] text-[var(--color-laser)] leading-none mt-0.5 shrink-0 min-w-[60px]">
                      {s.value}
                    </span>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">
                        {s.title}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3.5 border-t border-white/[0.06] bg-white/[0.03]">
                <p className="text-white/30 text-[11px] font-[family-name:var(--font-mono)] tracking-wider uppercase text-center">
                  Fonte: Pesquisa ADA &amp; MASCC/ISOO
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Myth vs Truth — Full-width rows ── */}
        <div className="space-y-4 md:space-y-5">
          {myths.map((item, i) => (
            <div key={i} className="myth-row">
              <div className="rounded-2xl border border-white/[0.10] bg-white/[0.06] backdrop-blur-xl overflow-hidden hover:border-white/[0.15] transition-colors duration-400">
                {/* Card content — two columns */}
                <div className="flex flex-col md:flex-row">
                  {/* MITO side */}
                  <div className="flex-1 p-6 md:p-8 md:pr-10 border-b md:border-b-0 md:border-r border-white/[0.06]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] font-bold tracking-[0.2em] uppercase">
                        Mito
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-laser)]/30 to-transparent" />
                      <span className="text-white/30 text-sm font-[family-name:var(--font-mono)]">
                        {item.number}
                      </span>
                    </div>
                    <p className="text-white/90 text-lg md:text-xl font-semibold leading-snug">
                      &ldquo;{item.myth}&rdquo;
                    </p>
                  </div>

                  {/* REALIDADE side */}
                  <div className="flex-1 p-6 md:p-8 md:pl-10 bg-white/[0.04]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-emerald-400 text-xs font-[family-name:var(--font-mono)] font-bold tracking-[0.2em] uppercase">
                        Realidade
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/30 to-transparent" />
                    </div>
                    <p className="text-white/80 text-base md:text-[17px] leading-relaxed">
                      {item.truth}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom closing ── */}
        <div className="myths-bottom max-w-3xl mx-auto mt-20 md:mt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-laser)]/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-[family-name:var(--font-serif)] italic text-white/90 leading-snug mb-4">
              &ldquo;Se você ainda{" "}
              <span className="text-white/40 line-through decoration-[var(--color-laser)]/60">
                testa parâmetros,
              </span>{" "}
              você ainda{" "}
              <span className="text-[var(--color-laser)]">
                não domina laserterapia.
              </span>
              &rdquo;
            </p>
            <p className="text-white/30 text-xs font-[family-name:var(--font-mono)] uppercase tracking-[0.2em] mb-10">
              É exatamente isso que você vai encontrar neste curso
            </p>

            <a
              href="#investimento"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("investimento")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-magnetic inline-flex items-center gap-3 bg-[var(--color-laser)] text-white font-semibold text-sm tracking-wider px-8 py-4 rounded-sm uppercase"
            >
              <span>Quero Dominar a Laserterapia</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
