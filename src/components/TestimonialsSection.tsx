"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    avatar: "/depoimentos/01/avatar.jpeg",
    name: "Hechelyn Bolsi",
    handle: "@dentista.hechelyn",
    screenshot: "/depoimentos/01/Depoimento-1.png",
  },
  {
    avatar: "/depoimentos/02/avatar.jpeg",
    name: "Giovana Vanzella",
    handle: "@dra.giovanavanzella",
    screenshot: "/depoimentos/02/depoimento-02.png",
  },
  {
    avatar: "/depoimentos/03/avatar.jpeg",
    name: "Emanuelly Carneiro",
    handle: "@carneiro_emanuelly",
    screenshot: "/depoimentos/03/depoimento-03.png",
  },
  {
    avatar: "/depoimentos/04/avatar.jpeg",
    name: "Vanessa Eloise Fenner",
    handle: "@vanessaeloisefenner",
    screenshot: "/depoimentos/04/depoimento-04.png",
  },
  {
    avatar: "/depoimentos/05/avatar.jpeg",
    name: "Gabriela P. De Bortoli",
    handle: "@gabii.bortoli",
    screenshot: "/depoimentos/05/depoimento-05.png",
  },
  {
    avatar: "/depoimentos/06/avatar.jpeg",
    name: "Jeferson Furlan",
    handle: "@furlan_odonto",
    screenshot: "/depoimentos/06/depoimento-06.png",
  },
  {
    avatar: "/depoimentos/07/avatar.jpeg",
    name: "Dr. Renata Delgado",
    handle: "@renatadelgado.odontopediatra",
    screenshot: "/depoimentos/07/depoimento-07.png",
  },
];

// Duplicate enough times to fill a seamless loop
const row1 = [...testimonials, ...testimonials, ...testimonials];
const offset = Math.ceil(testimonials.length / 2);
const row2Shifted = [
  ...testimonials.slice(offset),
  ...testimonials.slice(0, offset),
];
const row2 = [...row2Shifted, ...row2Shifted, ...row2Shifted];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="testimonial-card shrink-0 w-[420px] bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden select-none">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-[var(--color-cream)]">
          <Image
            src={t.avatar}
            alt={t.name}
            width={36}
            height={36}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <div>
          <p className="text-[var(--color-charcoal)] font-semibold text-sm leading-tight">
            {t.name}
          </p>
          <p className="text-[var(--color-moss)] text-xs font-[family-name:var(--font-mono)] mt-0.5">
            {t.handle}
          </p>
        </div>
      </div>

      {/* Screenshot */}
      <div className="w-full px-4 pb-4">
        <Image
          src={t.screenshot}
          alt={`Depoimento de ${t.name}`}
          width={600}
          height={400}
          className="w-full h-auto object-contain rounded-xl pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ─── Draggable marquee row hook ─── */
function useDraggableMarquee(
  direction: "left" | "right",
  speed: number // px per second
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0,
    velocity: 0,
    lastPointerX: 0,
    lastTime: 0,
    rafId: 0,
    autoSpeed: direction === "left" ? -speed : speed,
    momentumTween: null as gsap.core.Tween | null,
  });

  const getTranslateX = useCallback((el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const state = stateRef.current;
    // Width of one "set" (1/3 of the track since we have 3x copies)
    const oneSetWidth = track.scrollWidth / 3;

    // Set initial position for "right" direction
    if (direction === "right") {
      gsap.set(track, { x: -oneSetWidth });
    }

    let lastTimestamp = 0;

    const wrapX = (x: number) => {
      // Keep x within bounds: [-oneSetWidth*2, 0]
      while (x <= -oneSetWidth * 2) x += oneSetWidth;
      while (x > 0) x -= oneSetWidth;
      return x;
    };

    const loop = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (!state.isDragging && !state.momentumTween) {
        let currentX = getTranslateX(track);
        currentX += state.autoSpeed * delta;
        currentX = wrapX(currentX);
        gsap.set(track, { x: currentX });
      }

      state.rafId = requestAnimationFrame(loop);
    };

    state.rafId = requestAnimationFrame(loop);

    // ─── Pointer handlers ───

    const onPointerDown = (e: PointerEvent) => {
      // Kill any ongoing momentum
      if (state.momentumTween) {
        state.momentumTween.kill();
        state.momentumTween = null;
      }

      state.isDragging = true;
      state.startX = e.clientX;
      state.currentX = getTranslateX(track);
      state.velocity = 0;
      state.lastPointerX = e.clientX;
      state.lastTime = performance.now();
      track.style.cursor = "grabbing";
      track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.isDragging) return;
      const dx = e.clientX - state.startX;
      let newX = wrapX(state.currentX + dx);
      gsap.set(track, { x: newX });

      // Track velocity
      const now = performance.now();
      const dt = now - state.lastTime;
      if (dt > 0) {
        state.velocity = (e.clientX - state.lastPointerX) / dt; // px/ms
      }
      state.lastPointerX = e.clientX;
      state.lastTime = now;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!state.isDragging) return;
      state.isDragging = false;
      track.style.cursor = "grab";
      track.releasePointerCapture(e.pointerId);

      // Apply momentum
      const currentX = getTranslateX(track);
      const momentum = state.velocity * 250;
      const targetX = wrapX(currentX + momentum);

      state.momentumTween = gsap.to(track, {
        x: targetX,
        duration: 0.9,
        ease: "power3.out",
        onComplete: () => {
          state.momentumTween = null;
        },
      });
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    // Prevent native drag
    const preventDrag = (e: Event) => e.preventDefault();
    track.addEventListener("dragstart", preventDrag);

    return () => {
      cancelAnimationFrame(state.rafId);
      if (state.momentumTween) state.momentumTween.kill();
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("dragstart", preventDrag);
    };
  }, [direction, speed, getTranslateX]);

  return trackRef;
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useDraggableMarquee("left", 40);
  const row2Ref = useDraggableMarquee("right", 30);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-header", {
        scrollTrigger: {
          trigger: ".testimonials-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative bg-[var(--color-cream)] py-24 md:py-32 overflow-hidden"
    >
      <div className="container-narrow">
        <div className="testimonials-header mb-16 md:mb-24">
          <p className="text-[var(--color-laser)] text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase mb-4">
            Depoimentos
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-charcoal)] leading-[1.1] tracking-tight">
            Quem já participou{" "}
            <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-laser)]">
              recomenda.
            </span>
          </h2>
        </div>

        {/* Marquee rows */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-r from-[var(--color-cream)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-l from-[var(--color-cream)] to-transparent" />

          {/* Row 1 — auto-scrolls left, draggable */}
          <div className="flex mb-5 overflow-hidden">
            <div
              ref={row1Ref}
              className="flex gap-5 cursor-grab touch-pan-y"
              style={{ willChange: "transform" }}
            >
              {row1.map((t, i) => (
                <TestimonialCard key={`r1-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* Row 2 — auto-scrolls right, draggable */}
          <div className="flex overflow-hidden">
            <div
              ref={row2Ref}
              className="flex gap-5 cursor-grab touch-pan-y"
              style={{ willChange: "transform" }}
            >
              {row2.map((t, i) => (
                <TestimonialCard key={`r2-${i}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
