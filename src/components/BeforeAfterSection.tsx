"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  ChevronRight,
  Microscope,
  Clock,
  Sparkles,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ───────── Case data ───────── */
const clinicalCases = [
  {
    id: 1,
    title: "Pós-Cirúrgico de Paraendodôntica",
    subtitle: "Cicatrização acelerada com fotobiomodulação",
    description:
      "Pós-operatório de cirurgia paraendodôntica A laserterapia reduziu o edema e a inflamação, acelerando o processo cicatricial e promovendo recuperação tecidual.",
    image: "/casos/caso%201/caso_1.png",
    sessions: "1 sessão",
    duration: "48 horas",
    specialty: "Endodontia",
  },
  {
    id: 2,
    title: "Queilite Esfoliativa",
    subtitle: "Lesão traumática facticial com regressão importante com auxílio da fotobiomodulação",
    description:
      "A laserterapia acelerou o processo de reparo e garantiu maior conforto ao paciente promovendo melhora do reparo tecidual em menor tempo.",
    image: "/casos/caso%202/caso_2.png",
    sessions: "4 sessões",
    duration: "5 dias",
    specialty: "Estomatologia",
  },
  {
    id: 3,
    title: "Língua Geográfica",
    subtitle: "Regressão completa com protocolo de laserterapia",
    description:
      "Língua geográfica em odontopediatria tratada com fotobiomodulação, promovendo regressão total da lesão e recuperação do aspecto clínico normal.",
    image: "/casos/caso%203/caso_3.png",
    sessions: "1 sessões",
    duration: "24 horas",
    specialty: "Odontopediatria",
  },
  {
    id: 4,
    title: "Herpes Extraoral",
    subtitle: "Lesão de etiologia viral tratada com terapia fotodinâmica para descontaminação e aceleração do reparo",
    description:
      "A terapia fotodinâmica transformou a lesão em estágio de vesícula para crosta em menor tempo reduzindo dor e risco de contaminação.",
    image: "/casos/caso%204/caso_4.png",
    sessions: "1 sessões",
    duration: "24 horas",
    specialty: "Estomatologia",
  },
  {
    id: 5,
    title: "Hematoma em lábio",
    subtitle: "Hematoma labial como consequência do procedimento de preenchimento labial modulado com fotobiomodulação",
    description:
      "A fotobiomodulação acelerou o processo das fases do hematoma, reduzindo o desconforto estético do paciente e gerando conforto por modulação do processo inflamatório.",
    image: "/casos/caso%205/caso_5.png",
    sessions: "2 sessões",
    duration: "48 horas",
    specialty: "Harmonização Orofacial",
  },
];



/* ───────── Main Section ───────── */
export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userPausedUntil = useRef(0);

  const navigateCase = useCallback(
    (direction: "prev" | "next") => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      // Pause autoplay for 10s after user interaction
      userPausedUntil.current = Date.now() + 10000;
      setActiveCase((prev) => {
        if (direction === "next") return (prev + 1) % clinicalCases.length;
        return prev === 0 ? clinicalCases.length - 1 : prev - 1;
      });
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  // Auto-play: advance every 6s, only when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const startAutoplay = () => {
      if (autoPlayRef.current) return; // already running
      autoPlayRef.current = setInterval(() => {
        if (Date.now() < userPausedUntil.current) return;
        setIsTransitioning(true);
        setActiveCase((prev) => (prev + 1) % clinicalCases.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }, 6000);
    };

    const stopAutoplay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      stopAutoplay();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".ba-heading", {
        scrollTrigger: {
          trigger: ".ba-heading",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Slider reveal
      gsap.from(".ba-slider-container", {
        scrollTrigger: {
          trigger: ".ba-slider-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: "power3.out",
      });

      // Info panel reveal
      gsap.from(".ba-info-panel", {
        scrollTrigger: {
          trigger: ".ba-info-panel",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Bottom nav dots
      gsap.from(".ba-nav", {
        scrollTrigger: {
          trigger: ".ba-nav",
          start: "top 95%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCase = clinicalCases[activeCase];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden"
      id="resultados"
    >
      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gold glow top */}
        <div className="absolute -top-40 left-1/4 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 container-narrow">
        {/* ── Header ── */}
        <div className="ba-heading max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/15 rounded-full px-5 py-2 mb-8 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-gold)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-gold)]" />
            </span>
            <span className="text-[var(--color-gold)] text-xs font-[family-name:var(--font-mono)] tracking-[0.15em] uppercase">
              Casos Clínicos Reais
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-charcoal)] leading-[1.1] tracking-tight mb-6">
            Resultados que{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-gold)]">
                falam
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
                  stroke="#C9A84C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>{" "}
            por si só
          </h2>

          <p className="text-[var(--color-charcoal)]/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Casos clínicos reais documentados com{" "}
            <span className="text-[var(--color-charcoal)] font-medium">
              protocolo, dosimetria e acompanhamento.
            </span>{" "}
            A prova está nas imagens.
          </p>
        </div>

        {/* ── Main content: slider + info ── */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-8">
            {/* Image slider */}
            <div className="ba-slider-container relative">
              {/* Images with arrows overlaid */}
              <div className="relative">
                {/* Single combined before/after image */}
                <div
                  key={currentCase.id}
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden transition-opacity duration-500"
                  style={{ opacity: isTransitioning ? 0.5 : 1 }}
                >
                  <img
                    src={currentCase.image}
                    alt={`${currentCase.title} — Antes e Depois`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                  {/* ── Selo "Resultado de Aluno" ── */}
                  <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-4 z-30 flex items-center gap-1 md:gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-2.5 md:px-3.5 py-1 md:py-2 shadow-xl">
                    <GraduationCap size={10} className="text-[var(--color-gold)] shrink-0 md:w-[14px] md:h-[14px]" />
                    <span className="text-white text-[8px] md:text-xs font-semibold tracking-wide drop-shadow-lg whitespace-nowrap">
                      Resultado de Aluno
                    </span>
                  </div>
                </div>

                {/* Top row: ANTES — CASO — DEPOIS (aligned) */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-30 flex items-center justify-between">
                  {/* ANTES */}
                  <div className="flex items-center gap-1 md:gap-1.5 bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-[7px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                    <Clock size={8} className="md:w-[12px] md:h-[12px]" />
                    Antes
                  </div>

                  {/* CASO */}
                  <div className="flex items-center gap-1 md:gap-2 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-2.5 md:px-4 py-1 md:py-1.5 shadow-xl">
                    <Microscope size={9} className="text-[var(--color-gold)] md:w-[13px] md:h-[13px]" />
                    <span className="text-white/80 text-[8px] md:text-xs font-[family-name:var(--font-mono)] tracking-wider whitespace-nowrap">
                      Caso{" "}
                      <span className="text-[var(--color-gold)] font-bold">
                        {String(activeCase + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/30">
                        {" "}
                        / {String(clinicalCases.length).padStart(2, "0")}
                      </span>
                    </span>
                  </div>

                  {/* DEPOIS */}
                  <div className="flex items-center gap-1 md:gap-1.5 bg-[var(--color-gold)]/90 backdrop-blur-sm text-white text-[7px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                    <Sparkles size={8} className="md:w-[12px] md:h-[12px]" />
                    Depois
                  </div>
                </div>

                {/* Left arrow — overlaid */}
                <button
                  onClick={() => navigateCase("prev")}
                  className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Caso anterior"
                  style={{ boxShadow: '0 0 15px rgba(0,0,0,0.3), 0 0 30px rgba(0,0,0,0.1)' }}
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>

                {/* Right arrow — overlaid */}
                <button
                  onClick={() => navigateCase("next")}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Próximo caso"
                  style={{ boxShadow: '0 0 15px rgba(0,0,0,0.3), 0 0 30px rgba(0,0,0,0.1)' }}
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              </div>

              {/* Navigation dots — below images */}
              <div className="ba-nav flex items-center justify-center gap-3 mt-5">
                {clinicalCases.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (isTransitioning) return;
                      setIsTransitioning(true);
                      userPausedUntil.current = Date.now() + 10000;
                      setActiveCase(i);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }}
                    className="group relative flex flex-col items-center gap-2"
                    aria-label={`Ver caso ${c.title}`}
                  >
                    <div
                      className={`relative w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === activeCase
                        ? "bg-[var(--color-gold)] scale-100"
                        : "bg-[var(--color-charcoal)]/15 scale-75 hover:bg-[var(--color-charcoal)]/30 hover:scale-90"
                        }`}
                    >
                      {i === activeCase && (
                        <div className="absolute inset-0 rounded-full bg-[var(--color-gold)]/40 animate-ping" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Info Panel ── */}
            <div className="ba-info-panel flex flex-col">
              {/* Case title card */}
              <div className="bg-white border border-[var(--color-cream-dark)] rounded-2xl p-6 md:p-7 flex-1 shadow-lg">
                {/* Specialty tag */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                  <span className="text-[var(--color-gold)] text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-[0.2em]">
                    {currentCase.specialty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-charcoal)] leading-tight mb-2 transition-all duration-300">
                  {currentCase.title}
                </h3>
                <p className="text-[var(--color-laser)] text-sm font-medium mb-5">
                  {currentCase.subtitle}
                </p>

                {/* Description — fixed height */}
                <p className="text-[var(--color-charcoal)]/50 text-sm md:text-[15px] leading-relaxed mb-6 line-clamp-3">
                  {currentCase.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-cream-dark)] to-transparent mb-6" />

                {/* Protocol specs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[var(--color-cream)] rounded-xl px-4 py-3 border border-[var(--color-cream-dark)]">
                    <p className="text-[var(--color-charcoal)]/30 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-[0.2em] mb-1">
                      Sessões
                    </p>
                    <p className="text-[var(--color-charcoal)] font-semibold text-sm">
                      {currentCase.sessions}
                    </p>
                  </div>
                  <div className="bg-[var(--color-cream)] rounded-xl px-4 py-3 border border-[var(--color-cream-dark)]">
                    <p className="text-[var(--color-charcoal)]/30 text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-[0.2em] mb-1">
                      Duração
                    </p>
                    <p className="text-[var(--color-charcoal)] font-semibold text-sm">
                      {currentCase.duration}
                    </p>
                  </div>
                </div>


              </div>

              {/* Credibility badge */}
              <div className="mt-4 flex items-center gap-3 bg-[var(--color-cream)] border border-[var(--color-cream-dark)] rounded-xl px-4 py-3">
                <ShieldCheck
                  size={16}
                  className="text-[var(--color-gold)]/60 shrink-0"
                />
                <p className="text-[var(--color-charcoal)]/30 text-[10px] md:text-[11px] leading-snug">
                  Resultado obtido por aluno do curso. Caso clínico real
                  documentado com autorização do paciente. Resultados
                  individuais podem variar.
                </p>
              </div>
            </div>
          </div>


        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-3xl mx-auto mt-20 md:mt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-cream-dark)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-cream-dark)]" />
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-[family-name:var(--font-serif)] italic text-[var(--color-moss)] leading-snug mb-4">
              &ldquo;Seja o profissional que{" "}
              <span className="text-[var(--color-gold)]">resolve em minutos</span>{" "}
              o que outros{" "}
              <span className="text-[var(--color-laser)]">
                não conseguem em dias.
              </span>
              &rdquo;
            </p>
            <p className="text-[var(--color-charcoal)]/30 text-xs font-[family-name:var(--font-mono)] uppercase tracking-[0.2em] mb-10">
              Resultados reproduzíveis com o método certo
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
              <span>Quero Esses Resultados</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
