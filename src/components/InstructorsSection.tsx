"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, BookOpen, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  {
    name: "Ms. Vinicius Marchiori",
    photo:
      "/vinicius.jpg",
    title: "Mestre em Odontologia · Habilitação em Laserterapia",
    credentials: [
      "Mestre em Odontologia — UNIOESTE",
      "Especialista em Endodontia — UniABO, Cascavel - PR",
      "Habilitação em Laserterapia — Hospital Albert Einstein, SP",
      "Atualização em Urgências Odontológia e Terapêutica Medicamentosa — Instituto Israelita de Ensino e Pesquisa Albert Einstein, São Paulo, SP",
      "Professor Convidado nos cursos de Especialização de Implantodontia, Endodontia e Harmonização Orofacial — UniABO Cascavel",
      "Atuação Clínica a mais de 8 anos nas áreas de Endodontia e Laserterapia de Alta e Baixa Potência",
      "Expert na Modalidade de Endodontia Delivery e Laserterapia Home Care",
      "Referência em Retratamento Endodôntico e Cirurgias Paredodônticas",
      "Atualização em Endodontia — UniABO Cascavel",
      "Autor do Ebook: Atendimento de Urgência em Endodontia: Guia Prático em 3 Passos",
      "Sócio Coordenador da Imersão em Laserterapia para Dentistas com mais de 100 alunos formados",
    ],
    animDir: "left",
    imageStyle: {},
  },
  {
    name: "Profa. Dra. Danielle Portinho",
    photo: "/danielle.jpg",
    title: "Pós-Doutora · Pesquisadora em Laserterapia",
    credentials: [
      "Pós-doutorado em Odontologia – UNIOESTE",
      "Doutora em Biologia Buco-Dental – FOP/UNICAMP",
      "Mestre em Ciências Biológicas — UFPR",
      "MBA em Negócios Odontológicos - UNYLEYA",
      "Especialista em Endodontia — UniABO, Cascavel - PR",
      "Especialista em Prótese Dentária — UniABO, Cascavel - PR",
      "Especialista em Ciências Morfofisiológicas — UNIOESTE",
      "Habilitação em Laserterapia — SLM",
      "Habilitação em Sedação com Óxido Nitroso - FGB",
      "Atualização em Endodontia - UniABO, Cascavel – PR",
      "Graduação em Odontologia e Ciências Biológicas - UNIOESTE",
      "Professora Convidada nos cursos de Especialização de Implantodontia, Odontopediatria, Endodontia e Harmonização Orofacial - UniABO Cascavel",
      "Atuação Clínica a mais de 15 anos nas áreas de Endodontia, Clínica Geral, atendimento de crianças e PNE, Laserterapia de Alta e Baixa Potência e Laserterapia Home Care",
      "Docente adjunta no Curso de Odontologia da UNIOESTE nas disciplinas de Biossegurança e Anestesiologia e Clínica Integrada do Adulto",
      "Autora de artigos e capítulo de livro",
      "Orientadora de Trabalhos de Conclusão de Curso de Graduação e de Especialização",
      "Sócia-administradora da Evoluté Clínica Integrada e Ensino Ltda.",
      "Sócia Coordenadora da Imersão em Laserterapia para Dentistas com mais de 100 alunos formados",
    ],
    animDir: "right",
    imageStyle: { transform: "scale(1.2) translateY(5%)" },
  },
];

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".instructor-left", {
        scrollTrigger: {
          trigger: ".instructors-grid",
          start: "top 80%",
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".instructor-right", {
        scrollTrigger: {
          trigger: ".instructors-grid",
          start: "top 80%",
        },
        x: 80,
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
      className="relative bg-[var(--color-charcoal)] py-24 md:py-32 overflow-hidden"
      id="professores"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.06)_0%,transparent_65%)]" />
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
        <div className="text-center mb-16">
          <p className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            Corpo Docente
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Aprenda com quem{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
              domina
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="instructors-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className={`${i === 0 ? "instructor-left" : "instructor-right"} bg-white/[0.04] rounded-[2rem] overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500`}
            >
              {/* Photo */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center", ...inst.imageStyle }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <GraduationCap size={14} className="text-[var(--color-gold)]" />
                    <span className="text-[var(--color-gold)] text-xs font-[family-name:var(--font-mono)]">
                      {inst.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {inst.name}
                </h3>
                <ul className="space-y-2.5">
                  {inst.credentials.map((cred, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-white/50"
                    >
                      <Award
                        size={14}
                        className="text-[var(--color-laser)]/60 mt-0.5 shrink-0"
                      />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

