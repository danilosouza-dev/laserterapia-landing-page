"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    title: "Dor pós-operatória",
    description:
      "Alívio imediato com fotobiomodulação. Reduz inflamação e acelera a recuperação desde a primeira sessão.",
  },
  {
    title: "Cicatrização lenta",
    description:
      "Estimula a regeneração celular e reduz o tempo de cicatrização em extrações, implantes e cirurgias.",
  },
  {
    title: "DTM e dor orofacial",
    description:
      "Tratamento não invasivo que reduz dor muscular e articular com protocolos comprovados cientificamente.",
  },
  {
    title: "Herpes labial",
    description:
      "Interrompe a evolução da lesão e reduz recidivas. Resultado visível já na primeira aplicação.",
  },
  {
    title: "Sensibilidade dentária",
    description:
      "Elimina a hipersensibilidade pós-clareamento e em dentes vitais com aplicação rápida e indolor.",
  },
  {
    title: "Fístula persistente",
    description:
      "Acelera o fechamento de fístulas e complementa o tratamento endodôntico com descontaminação eficaz.",
  },
  // ── Novos cards (expandíveis) ──
  {
    title: "Redução da dor após ativação ortodôntica",
    description:
      "Modulação do processo inflamatório que diminui significativamente o desconforto pós-ajustes de aparelhos e alinhadores.",
  },
  {
    title: "Aceleração da movimentação dentária",
    description:
      "Estimula atividade osteoblástica e osteoclástica, podendo reduzir o tempo de tratamento ortodôntico.",
  },
  {
    title: "Prevenção e tratamento da mucosite",
    description:
      "Reduz a severidade das lesões orais ou até mesmo inibe a sua manifestação em pacientes oncológicos, acelerando a regeneração tecidual e promovendo conforto na alimentação.",
  },
  {
    title: "Ação antimicrobiana intracanal (PDT)",
    description:
      "Potencializa a desinfecção dos canais radiculares quando associada à terapia fotodinâmica.",
  },
  {
    title: "Diagnóstico endodôntico mais preciso",
    description:
      "Auxilia na identificação do dente ou região acometida em casos de dor difusa através da resposta à fotobiomodulação.",
  },
  {
    title: "Melhora da osseointegração",
    description:
      "Estimula reparo ósseo ao redor de implantes, favorecendo estabilidade e sucesso clínico.",
  },
  {
    title: "Frenectomia com mais conforto e previsibilidade",
    description:
      "Melhora na qualidade do reparo tecidual, favorecendo resultados estéticos e funcionais (fala, deglutição e amamentação).",
  },
];

const INITIAL_VISIBLE = 6;

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const expandableRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".problem-heading-reveal", {
        scrollTrigger: {
          trigger: ".problem-heading-reveal",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Cards stagger animation (only initial 6)
      const cards = cardsRef.current?.querySelectorAll(".solution-card");
      if (cards) {
        gsap.set(cards, { y: 60, opacity: 0 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 88%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
        });
      }

      // Manifesto animation
      gsap.from(".problem-manifesto", {
        scrollTrigger: {
          trigger: ".problem-manifesto",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
    const wrapper = expandableRef.current;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll(".solution-card-new");

    // Set cards invisible before measuring
    gsap.set(cards, { y: 40, opacity: 0 });

    // Animate wrapper height from 0 to auto
    gsap.fromTo(
      wrapper,
      { height: 0, opacity: 0 },
      {
        height: "auto",
        opacity: 1,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          wrapper.style.height = "auto";
        },
      }
    );

    // Stagger cards in (slightly delayed for height to start opening)
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.07,
      ease: "power3.out",
      delay: 0.25,
    });
  }, []);

  const handleCollapse = useCallback(() => {
    const wrapper = expandableRef.current;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll(".solution-card-new");

    // Fade out cards first
    gsap.to(cards, {
      y: 25,
      opacity: 0,
      duration: 0.35,
      stagger: 0.03,
      ease: "power2.in",
    });

    // Collapse wrapper height
    gsap.to(wrapper, {
      height: 0,
      opacity: 0,
      duration: 0.7,
      ease: "power3.inOut",
      delay: 0.15,
      onComplete: () => {
        setIsExpanded(false);
      },
    });
  }, []);

  const visibleSolutions = solutions.slice(0, INITIAL_VISIBLE);
  const expandedSolutions = solutions.slice(INITIAL_VISIBLE);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-charcoal)] py-28 md:py-40 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.06)_0%,transparent_65%)]" />
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
        {/* ── Section header ── */}
        <div className="problem-heading-reveal mb-20">
          {/* Tag — centered */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-laser)] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-laser)]" />
              </span>
              <span className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.15em] uppercase">
                Laserterapia
              </span>
            </div>
          </div>

          {/* Title (left) + Subtitle (right) */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              O que a laserterapia
              <br />
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
                resolve
              </span>{" "}
              no seu consultório
            </h2>

            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md lg:text-right shrink-0">
              Casos reais que chegam todo dia — e que você vai{" "}
              <span className="text-white/80 font-medium">
                resolver com confiança.
              </span>
            </p>
          </div>
        </div>

        {/* ── Initial 6 solution cards ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {visibleSolutions.map((solution, i) => (
            <div
              key={i}
              className="solution-card group relative rounded-[1.75rem] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-[var(--color-laser)]/20 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,30,30,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 p-8 md:p-9 flex flex-col h-full">
                {/* Number accent */}
                <span className="text-[80px] font-bold font-[family-name:var(--font-mono)] leading-none text-white/[0.03] group-hover:text-[var(--color-laser)]/[0.08] transition-colors duration-700 absolute top-4 right-6 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Red accent line */}
                <div className="w-8 h-[3px] bg-[var(--color-laser)]/40 group-hover:bg-[var(--color-laser)] group-hover:w-12 transition-all duration-500 mb-6 rounded-full" />

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 group-hover:text-white/55 text-[15px] leading-relaxed transition-colors duration-500 flex-1">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Expandable cards wrapper (always in DOM, height animated) ── */}
        <div
          ref={expandableRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-5">
            {expandedSolutions.map((solution, i) => (
              <div
                key={i}
                className="solution-card-new group relative rounded-[1.75rem] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-[var(--color-laser)]/20 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,30,30,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 p-8 md:p-9 flex flex-col h-full">
                  {/* Number accent */}
                  <span className="text-[80px] font-bold font-[family-name:var(--font-mono)] leading-none text-white/[0.03] group-hover:text-[var(--color-laser)]/[0.08] transition-colors duration-700 absolute top-4 right-6 select-none pointer-events-none">
                    {String(INITIAL_VISIBLE + i + 1).padStart(2, "0")}
                  </span>

                  {/* Red accent line */}
                  <div className="w-8 h-[3px] bg-[var(--color-laser)]/40 group-hover:bg-[var(--color-laser)] group-hover:w-12 transition-all duration-500 mb-6 rounded-full" />

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/40 group-hover:text-white/55 text-[15px] leading-relaxed transition-colors duration-500 flex-1">
                    {solution.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Expand / Collapse button ── */}
        <div className="flex justify-center mt-10 mb-20">
          <button
            onClick={isExpanded ? handleCollapse : handleExpand}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--color-laser)]/30 transition-all duration-500 cursor-pointer"
          >
            <span className="text-white/60 group-hover:text-white/90 text-sm font-medium tracking-wide transition-colors duration-300">
              {isExpanded
                ? "Ver menos aplicações"
                : `Ver mais ${expandedSolutions.length} aplicações`}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-[var(--color-laser)] transition-transform duration-500 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </button>
        </div>

        {/* ── Manifesto ── */}
        <div className="problem-manifesto relative max-w-3xl mx-auto text-center">
          {/* Decorative quotes */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[120px] font-[family-name:var(--font-serif)] text-white/[0.04] leading-none select-none pointer-events-none">
            &ldquo;
          </span>

          <p className="relative z-10 text-2xl md:text-4xl font-[family-name:var(--font-serif)] italic text-white/80 leading-snug mb-6">
            &ldquo;Sem dominar a biofotônica, o laser vira só um{" "}
            <span className="text-[var(--color-laser)]">
              acessório caro
            </span>{" "}
            enfeitando a bancada do seu consultório.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/10" />
            <p className="text-xs text-white/30 font-[family-name:var(--font-mono)] uppercase tracking-[0.2em]">
              Domine o protocolo, domine os resultados
            </p>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
