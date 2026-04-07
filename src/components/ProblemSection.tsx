"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const masteryItems = [
  {
    title: "Dosimetria Exata",
    tags: ["660nm", "808nm", "J/cm²", "Potência Óptica"],
    description:
      "Domine os parâmetros que separam o sucesso do fracasso: comprimento de onda, potência e fluência.",
    image: "/images/mastery-dosimetria.jpg",
    gradient: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "Protocolos Clínicos",
    tags: ["Anti-inflamatório", "Bioestimulação", "Analgesia", "Reparo"],
    description:
      "Protocolos validados cientificamente para as situações mais comuns da clínica odontológica.",
    image: "/images/mastery-protocolos.jpg",
    gradient: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "Fotobiomodulação",
    tags: ["Citocromo C", "ATP", "Mitocôndria", "Absorção"],
    description:
      "Entenda a ciência por trás da interação luz-tecido e como aplicar com evidência.",
    image: "/images/mastery-fotobiomodulacao.jpg",
    gradient: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "Casos Reais",
    tags: ["DTM", "Herpes", "Mucosite", "Parestesia"],
    description:
      "Analise casos clínicos reais com antes e depois, protocolos detalhados e resultados.",
    image: "/images/mastery-casos.jpg",
    gradient: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "Prática Supervisionada",
    tags: ["Hands-on", "Equipamentos", "Supervisão", "Feedback"],
    description:
      "Pratique com equipamentos profissionais sob supervisão direta dos instrutores.",
    image: "/images/mastery-pratica.jpg",
    gradient: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "Certificação",
    tags: ["20h", "Certificado", "Currículo"],
    description:
      "Receba certificado de conclusão reconhecido com carga horária de 20 horas.",
    image: "/images/mastery-certificacao.jpg",
    gradient: "from-black/60 via-black/30 to-transparent",
  },
];

const DOT_SIZE = 14;

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const trackBgRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDots, setActiveDots] = useState<boolean[]>(
    new Array(masteryItems.length).fill(false)
  );

  const updateTrackBounds = useCallback(() => {
    const container = timelineTrackRef.current;
    const firstDot = dotRefs.current[0];
    const lastDot = dotRefs.current[masteryItems.length - 1];
    if (!container || !firstDot || !lastDot) return;

    const containerRect = container.getBoundingClientRect();
    const firstRect = firstDot.getBoundingClientRect();
    const lastRect = lastDot.getBoundingClientRect();

    const topPx = firstRect.top + firstRect.height / 2 - containerRect.top;
    const bottomPx = lastRect.top + lastRect.height / 2 - containerRect.top;

    if (trackBgRef.current) {
      trackBgRef.current.style.top = `${topPx}px`;
      trackBgRef.current.style.height = `${bottomPx - topPx}px`;
    }
    if (laserBeamRef.current) {
      laserBeamRef.current.style.top = `${topPx}px`;
    }
  }, []);

  useEffect(() => {
    // ── Mobile/Android scroll compatibility ──
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);

    // Delay initialization so images/layout fully settle before measuring
    const initTimer = setTimeout(() => {
      updateTrackBounds();
      ScrollTrigger.refresh();
    }, 400);

    window.addEventListener("resize", updateTrackBounds);

    const ctx = gsap.context(() => {
      gsap.from(".mastery-heading-reveal", {
        scrollTrigger: {
          trigger: ".mastery-heading-reveal",
          start: "top 90%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        items.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
            x: isLeft ? -60 : 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        });
      }

      if (laserBeamRef.current && timelineTrackRef.current) {
        const container = timelineTrackRef.current;
        const firstDot = dotRefs.current[0];
        const lastDot = dotRefs.current[masteryItems.length - 1];
        if (firstDot && lastDot) {
          const containerRect = container.getBoundingClientRect();
          const firstY =
            firstDot.getBoundingClientRect().top +
            firstDot.getBoundingClientRect().height / 2 -
            containerRect.top;
          const lastY =
            lastDot.getBoundingClientRect().top +
            lastDot.getBoundingClientRect().height / 2 -
            containerRect.top;
          const totalH = lastY - firstY;

          gsap.set(laserBeamRef.current, { height: 0 });
          gsap.to(laserBeamRef.current, {
            height: totalH,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 55%",
              end: "bottom 50%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        ScrollTrigger.create({
          trigger: dot,
          start: "top 60%",
          invalidateOnRefresh: true,
          onEnter: () =>
            setActiveDots((prev) => {
              const n = [...prev];
              n[i] = true;
              return n;
            }),
          onLeaveBack: () =>
            setActiveDots((prev) => {
              const n = [...prev];
              n[i] = false;
              return n;
            }),
        });
      });

      gsap.from(".mastery-cta", {
        scrollTrigger: {
          trigger: ".mastery-cta",
          start: "top 90%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateTrackBounds);
      clearTimeout(initTimer);
    };
  }, [updateTrackBounds]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-cream)] py-28 md:py-40 overflow-hidden"
      id="sobre"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 container-narrow">
        <div className="mastery-heading-reveal mb-20 md:mb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-laser)]/8 border border-[var(--color-laser)]/15 rounded-full px-5 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-laser)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-laser)]" />
            </span>
            <span className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.15em] uppercase">
              O que você vai dominar
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-charcoal)] leading-[1.1] tracking-tight mx-auto">
            <span className="block">
              Conhecimento que{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
                  transforma
                </span>
                <svg
                  style={{ position: "absolute", bottom: "-4px", left: 0, width: "100%" }}
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
                    opacity="0.4"
                  />
                </svg>
              </span>
            </span>
            <span className="block">sua prática clínica</span>
          </h2>

          <p className="text-[var(--color-charcoal)]/50 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mt-6">
            Em dois dias intensivos, você sai preparado para aplicar a
            laserterapia com{" "}
            <span className="text-[var(--color-charcoal)] font-medium">
              segurança, precisão e resultados reais.
            </span>
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative" ref={timelineTrackRef}>
          {/* Background track */}
          <div
            ref={trackBgRef}
            className="absolute left-6 md:left-1/2 z-0"
            style={{
              width: 2,
              transform: "translateX(-50%)",
              background: "var(--color-cream-dark)",
            }}
          />

          {/* Laser beam */}
          <div
            ref={laserBeamRef}
            className="absolute left-6 md:left-1/2 z-[1] laser-beam-track"
            style={{
              width: 3,
              transform: "translateX(-50%)",
              height: 0,
            }}
          />

          {/* Timeline items */}
          <div className="relative z-10 space-y-16 md:space-y-24">
            {masteryItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeDots[i];

              return (
                <div
                  key={i}
                  className={`timeline-item relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 ml-10 sm:ml-14 md:ml-0 ${
                      isLeft
                        ? "md:pr-16 lg:pr-24"
                        : "md:pl-16 lg:pl-24"
                    }`}
                  >
                    <div
                      className={`mastery-card group relative rounded-2xl overflow-hidden transition-all duration-700 ${
                        isActive
                          ? "shadow-2xl shadow-black/15 scale-[1.01]"
                          : "shadow-lg shadow-black/5 scale-100"
                      }`}
                    >
                      {/* ── Image area ── */}
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={`object-cover transition-all duration-1000 ${
                            isActive
                              ? "scale-105 brightness-100"
                              : "scale-100 brightness-75 saturate-50"
                          }`}
                        />
                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${item.gradient}`}
                        />
                      </div>

                      {/* ── Text content ── */}
                      <div
                        className={`relative p-6 md:p-7 transition-all duration-700 ${
                          isActive
                            ? "bg-white"
                            : "bg-white/90"
                        }`}
                      >
                        {/* Accent bar */}
                        <div
                          className={`absolute top-0 left-6 md:left-7 h-[3px] rounded-full transition-all duration-700 ${
                            isActive
                              ? "w-16 bg-[var(--color-laser)]"
                              : "w-8 bg-[var(--color-cream-dark)]"
                          }`}
                        />

                        <h3
                          className={`text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-700 ${
                            isActive
                              ? "text-[var(--color-charcoal)]"
                              : "text-[var(--color-charcoal)]/70"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`text-sm md:text-[15px] leading-relaxed mb-5 transition-all duration-700 ${
                            isActive
                              ? "text-[var(--color-charcoal)]/65"
                              : "text-[var(--color-charcoal)]/50"
                          }`}
                        >
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, ti) => (
                            <span
                              key={ti}
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-medium font-[family-name:var(--font-mono)] tracking-wide uppercase transition-all duration-500 ${
                                isActive
                                  ? "bg-[var(--color-cream)] text-[var(--color-charcoal)]/70 border border-[var(--color-cream-dark)]"
                                  : "bg-[var(--color-cream)] text-[var(--color-charcoal)]/50 border border-[var(--color-cream-dark)]/50"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── DOT ── */}
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="absolute left-6 md:left-1/2 z-20"
                    style={{
                      top: 28,
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    <div
                      className={`absolute transition-all duration-500 rounded-full ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      }`}
                      style={{
                        width: DOT_SIZE * 3,
                        height: DOT_SIZE * 3,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background:
                          "radial-gradient(circle, rgba(196,30,30,0.2) 0%, rgba(196,30,30,0.06) 50%, transparent 70%)",
                      }}
                    />

                    <div
                      className={`absolute rounded-full bg-[var(--color-laser)] transition-opacity duration-300 ${
                        isActive ? "opacity-30 animate-ping" : "opacity-0"
                      }`}
                      style={{
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    <div
                      className={`absolute rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-[var(--color-laser)] laser-dot-active"
                          : "bg-[var(--color-cream-dark)] border-2 border-[var(--color-charcoal)]/10"
                      }`}
                      style={{
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mastery-cta relative max-w-3xl mx-auto text-center mt-24 md:mt-32">
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[120px] font-[family-name:var(--font-serif)] text-[var(--color-moss)]/[0.06] leading-none select-none pointer-events-none">
            &ldquo;
          </span>
          <p className="relative z-10 text-2xl md:text-4xl font-[family-name:var(--font-serif)] italic text-[var(--color-moss)] leading-snug mb-6">
            &ldquo;Aplicar laser qualquer um aplica.{" "}
            <span className="text-[var(--color-laser)]">
              Dominar a interação luz-tecido
            </span>{" "}
            é o que te torna referência.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[var(--color-moss)]/20" />
            <p className="text-xs text-[var(--color-moss)]/40 font-[family-name:var(--font-mono)] uppercase tracking-[0.2em]">
              Domínio técnico gera autoridade
            </p>
            <div className="h-px w-12 bg-[var(--color-moss)]/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
