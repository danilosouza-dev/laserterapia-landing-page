"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Professores", href: "#professores" },
  { label: "Programa", href: "#programa" },
  { label: "Investimento", href: "#investimento" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between
        px-6 py-3 rounded-full transition-all duration-500 ease-out
        ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border border-[var(--color-gold)]/20 shadow-lg shadow-black/5 w-[min(92vw,900px)]"
            : "bg-transparent border border-white/10 w-[min(92vw,900px)]"
        }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center">
          <span className="text-[var(--color-gold)] text-xs font-bold font-[family-name:var(--font-mono)]">
            LD
          </span>
        </div>
        <span
          className={`text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide transition-colors duration-500
            ${scrolled ? "text-[var(--color-moss)]" : "text-white"}`}
        >
          Laserterapia para Dentistas
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-sm font-medium tracking-tight transition-colors duration-500 hover:opacity-70
              ${scrolled ? "text-[var(--color-charcoal)]" : "text-white/80"}`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://wa.me/5545999667049?text=Quero%20garantir%20minha%20vaga%20no%20curso%20de%20Laserterapia"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-magnetic bg-[var(--color-laser)] text-white text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          <span>Garantir Vaga</span>
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`md:hidden transition-colors duration-500 ${scrolled ? "text-[var(--color-charcoal)]" : "text-white"}`}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-3xl border border-[var(--color-gold)]/20 shadow-xl p-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[var(--color-charcoal)] text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5545999667049?text=Quero%20garantir%20minha%20vaga%20no%20curso%20de%20Laserterapia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic bg-[var(--color-laser)] text-white text-sm font-bold px-5 py-3 rounded-full text-center"
            >
              <span>Garantir Minha Vaga</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
