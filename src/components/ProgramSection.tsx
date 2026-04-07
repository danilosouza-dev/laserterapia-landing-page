import { Clock, Coffee, Utensils, Award } from "lucide-react";

interface ScheduleItem {
  time: string;
  event: string;
  type: "main" | "break" | "highlight";
  sub?: string[];
}

const day1: ScheduleItem[] = [
  { time: "08h00", event: "Recepção", type: "break" },
  {
    time: "08h30",
    event: "Histórico",
    type: "main",
    sub: [
      "Fundamentos da laserterapia",
      "Aspectos biológicos e histológicos",
    ],
  },
  { time: "10h00", event: "Coffee Break", type: "break" },
  {
    time: "10h30",
    event: "Mecanismos biológicos da luz",
    type: "main",
    sub: ["Ações da luz nos tecidos vivos"],
  },
  { time: "12h30", event: "Almoço", type: "break" },
  {
    time: "13h30",
    event: "Funcionamento dos equipamentos",
    type: "main",
    sub: ["Dosimetria aplicada"],
  },
  { time: "15h30", event: "Coffee Break", type: "break" },
  {
    time: "16h00",
    event: "Fundamentos da Fotobiomodulação",
    type: "main",
    sub: ["ILIB", "Terapia fotodinâmica"],
  },
  { time: "18h00", event: "Encerramento Dia 1", type: "break" },
];

const day2: ScheduleItem[] = [
  { time: "08h00", event: "Recepção", type: "break" },
  {
    time: "08h30",
    event: "Protocolos avançados",
    type: "main",
    sub: [
      "Raciocínio clínico em laserterapia",
      "Quando utilizar terapia fotodinâmica",
    ],
  },
  { time: "10h00", event: "Coffee Break", type: "break" },
  { time: "10h30", event: "Discussão de casos clínicos reais", type: "main" },
  { time: "12h30", event: "Almoço", type: "break" },
  {
    time: "13h30",
    event: "Prática com equipamentos",
    type: "main",
    sub: ["Aspectos ergonômicos e de biossegurança em laserterapia"],
  },
  { time: "15h30", event: "Coffee Break", type: "break" },
  { time: "17h00", event: "Entrega dos Certificados", type: "highlight" },
  { time: "18h00", event: "Encerramento", type: "break" },
];

function DayCard({
  day,
  title,
  schedule,
}: {
  day: string;
  title: string;
  schedule: ScheduleItem[];
}) {
  return (
    <div className="bg-white border border-[var(--color-cream-dark)] rounded-3xl p-8 md:p-10 shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[var(--color-laser)] text-white text-xs font-bold font-[family-name:var(--font-mono)] px-4 py-2 rounded-full tracking-wider whitespace-nowrap">
          {day}
        </div>
        <div>
          <h3 className="text-[var(--color-charcoal)] text-xl font-bold">
            {title}
          </h3>
          <p className="text-[var(--color-charcoal)]/40 text-xs font-[family-name:var(--font-mono)]">
            08h00 — 18h00
          </p>
        </div>
      </div>
      <div className="space-y-1">
        {schedule.map((item, i) => {
          const isHighlight = item.type === "highlight";
          const isMain = item.type === "main";
          return (
            <div key={i}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  isHighlight
                    ? "bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20"
                    : isMain
                      ? "bg-[var(--color-cream)] hover:bg-[var(--color-cream-dark)]/30"
                      : ""
                }`}
              >
                <span className="text-[var(--color-charcoal)]/40 text-sm font-[family-name:var(--font-mono)] w-14 shrink-0">
                  {item.time}
                </span>
                {isHighlight ? (
                  <Award size={14} className="text-[var(--color-gold)]" />
                ) : isMain ? (
                  <Clock
                    size={14}
                    className="text-[var(--color-laser)]/50"
                  />
                ) : item.event.includes("Coffee") ? (
                  <Coffee
                    size={14}
                    className="text-[var(--color-charcoal)]/30"
                  />
                ) : item.event.includes("Almoço") ? (
                  <Utensils
                    size={14}
                    className="text-[var(--color-charcoal)]/30"
                  />
                ) : (
                  <Clock
                    size={14}
                    className="text-[var(--color-charcoal)]/30"
                  />
                )}
                <span
                  className={`text-sm ${
                    isHighlight
                      ? "font-bold text-[var(--color-gold)]"
                      : isMain
                        ? "text-[var(--color-charcoal)]/80 font-medium"
                        : "text-[var(--color-charcoal)]/30"
                  }`}
                >
                  {item.event}
                </span>
              </div>
              {item.sub && item.sub.length > 0 && (
                <div className="ml-[82px] mt-0.5 mb-1 space-y-0.5">
                  {item.sub.map((subItem, j) => (
                    <p
                      key={j}
                      className="text-xs text-[var(--color-charcoal)]/50 pl-1 border-l-2 border-[var(--color-laser)]/15 py-0.5 leading-relaxed"
                    >
                      {subItem}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProgramSection() {
  return (
    <section
      className="relative bg-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
      id="programa"
    >
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.04)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 container-narrow">
        {/* Header — CENTERED */}
        <div className="text-center mb-16">
          <p className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            Programa Completo
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-charcoal)] leading-[1.1] tracking-tight">
            Dois dias de{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
              imersão total
            </span>
          </h2>
        </div>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DayCard
            day="DIA 1"
            title="Fundamentos & Protocolos"
            schedule={day1}
          />
          <DayCard
            day="DIA 2"
            title="Prática & Casos Reais"
            schedule={day2}
          />
        </div>

        {/* ── Closing callout ── */}
        <div className="max-w-3xl mx-auto mt-16 md:mt-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-cream-dark)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-laser)]/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-cream-dark)]" />
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-[family-name:var(--font-serif)] italic text-[var(--color-charcoal)] leading-snug mb-4">
              &ldquo;Saia do básico e alcance o nível onde o laser deixa de ser um{" "}
              <span className="text-[var(--color-charcoal)]/30 line-through decoration-[var(--color-laser)]/50">
                recurso…
              </span>{" "}
              e vira{" "}
              <span className="text-[var(--color-laser)]">
                estratégia clínica.
              </span>
              &rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[var(--color-cream-dark)]" />
              <p className="text-xs text-[var(--color-charcoal)]/30 font-[family-name:var(--font-mono)] uppercase tracking-[0.2em]">
                20h de imersão prática e teórica
              </p>
              <div className="h-px w-12 bg-[var(--color-cream-dark)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

