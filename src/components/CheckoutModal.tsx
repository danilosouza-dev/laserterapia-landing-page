"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronDown } from "lucide-react";
import { useLenis } from "./SmoothScroll";

// ─── CONFIG ──────────────────────────────────────────────
// TODO: Replace with your actual checkout URL
const CHECKOUT_URL = "";

// TODO: Replace with your email marketing webhook/API endpoint
const EMAIL_MARKETING_WEBHOOK = "";
// ─────────────────────────────────────────────────────────

const COUNTRIES = [
  { code: "BR", ddi: "+55", flag: "🇧🇷", name: "Brasil" },
  { code: "US", ddi: "+1", flag: "🇺🇸", name: "Estados Unidos" },
  { code: "PT", ddi: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "AR", ddi: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", ddi: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CO", ddi: "+57", flag: "🇨🇴", name: "Colômbia" },
  { code: "MX", ddi: "+52", flag: "🇲🇽", name: "México" },
  { code: "UY", ddi: "+598", flag: "🇺🇾", name: "Uruguai" },
  { code: "PY", ddi: "+595", flag: "🇵🇾", name: "Paraguai" },
  { code: "PE", ddi: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "ES", ddi: "+34", flag: "🇪🇸", name: "Espanha" },
  { code: "IT", ddi: "+39", flag: "🇮🇹", name: "Itália" },
  { code: "DE", ddi: "+49", flag: "🇩🇪", name: "Alemanha" },
  { code: "FR", ddi: "+33", flag: "🇫🇷", name: "França" },
  { code: "GB", ddi: "+44", flag: "🇬🇧", name: "Reino Unido" },
  { code: "JP", ddi: "+81", flag: "🇯🇵", name: "Japão" },
  { code: "AO", ddi: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "MZ", ddi: "+258", flag: "🇲🇿", name: "Moçambique" },
];

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Lock page scroll when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => emailInputRef.current?.focus(), 150);
    lenis?.stop();
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, lenis]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isCountryDropdownOpen) {
          setIsCountryDropdownOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isCountryDropdownOpen, onClose]);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isCountryDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(e.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isCountryDropdownOpen]);

  // Close on overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  // Phone formatting
  const formatPhone = (value: string) => {
    let raw = value.replace(/\D/g, "");
    if (value.startsWith("+")) {
      const typed = value.replace(/[^0-9+]/g, "");
      for (const country of COUNTRIES) {
        if (typed.startsWith(country.ddi)) {
          setSelectedCountry(country);
          raw = typed.slice(country.ddi.length).replace(/\D/g, "");
          break;
        }
      }
    }
    if (selectedCountry.code === "BR") {
      const digits = raw.slice(0, 11);
      if (digits.length <= 2) return digits;
      if (digits.length <= 7)
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    return raw.slice(0, 15);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const validate = () => {
    const newErrors: { email?: string; phone?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Informe um e-mail válido";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 8) {
      newErrors.phone = "Informe um telefone válido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (EMAIL_MARKETING_WEBHOOK) {
        await fetch(EMAIL_MARKETING_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            phone: `${selectedCountry.ddi}${phone.replace(/\D/g, "")}`,
            country: selectedCountry.code,
            source: "landing_page_checkout",
            tags: ["laserterapia", "checkout_interest"],
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch {
      console.warn("Email marketing webhook failed");
    }
    if (CHECKOUT_URL) {
      window.open(CHECKOUT_URL, "_blank", "noopener,noreferrer");
    }
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "modalOverlayIn 0.3s ease-out",
      }}
    >
      <div
        className="relative w-full max-w-md"
        style={{
          animation: "modalContentIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Modal card — NO overflow-hidden so the dropdown can escape */}
        <div
          className="rounded-2xl"
          style={{
            background:
              "linear-gradient(145deg, #1a1a1a 0%, #111111 50%, #0a0a0a 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(196,30,30,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="px-6 sm:px-8 pt-8 pb-7">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Preencha seus dados para continuar
              </h3>
              <p className="text-white/60 text-xs mt-2">
                Seus dados estão seguros e não serão compartilhados.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email */}
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-white/50 text-[11px] font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1.5"
                >
                  E-mail
                </label>
                <input
                  ref={emailInputRef}
                  id="checkout-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  className="checkout-input"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-[var(--color-laser)] text-[11px] mt-1 font-[family-name:var(--font-mono)]">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-white/50 text-[11px] font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1.5"
                >
                  Telefone / WhatsApp
                </label>
                <div className="relative flex">
                  {/* Country selector wrapper — dropdown lives here, NO overflow clip */}
                  <div ref={dropdownWrapperRef} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsCountryDropdownOpen(!isCountryDropdownOpen)
                      }
                      className="flex items-center gap-1.5 h-full px-3 rounded-l-lg border border-r-0 cursor-pointer transition-colors duration-200"
                      style={{
                        background: "rgba(255, 255, 255, 0.06)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <span className="text-base leading-none">
                        {selectedCountry.flag}
                      </span>
                      <span className="text-white/50 text-xs font-[family-name:var(--font-mono)]">
                        {selectedCountry.ddi}
                      </span>
                      <ChevronDown
                        size={12}
                        className={`text-white/30 transition-transform duration-200 ${
                          isCountryDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Country dropdown — simple absolute, no portal */}
                    {isCountryDropdownOpen && (
                      <div
                        className="absolute bottom-full left-0 mb-1 w-56 max-h-52 rounded-lg py-1 country-dropdown-list"
                        style={{
                          zIndex: 99999,
                          background: "#1a1a1a",
                          border: "1px solid rgba(255,255,255,0.12)",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                          animation:
                            "dropdownIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {COUNTRIES.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsCountryDropdownOpen(false);
                              setPhone("");
                            }}
                            className={`w-full text-left px-3 py-2 flex items-center gap-2.5 transition-colors duration-100 cursor-pointer ${
                              selectedCountry.code === country.code
                                ? "bg-white/10 text-white"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="text-base leading-none">
                              {country.flag}
                            </span>
                            <span className="text-xs flex-1 truncate">
                              {country.name}
                            </span>
                            <span className="text-[11px] text-white/40 font-[family-name:var(--font-mono)]">
                              {country.ddi}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Phone input */}
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder={
                      selectedCountry.code === "BR"
                        ? "(00) 00000-0000"
                        : "Número de telefone"
                    }
                    value={phone}
                    onChange={handlePhoneChange}
                    className="checkout-input !rounded-l-none !border-l-0"
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[var(--color-laser)] text-[11px] mt-1 font-[family-name:var(--font-mono)]">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[var(--color-laser)] hover:bg-[var(--color-laser-light)] text-white font-bold text-sm tracking-[0.1em] uppercase py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  boxShadow:
                    "0 4px 24px rgba(196, 30, 30, 0.3), 0 0 40px rgba(196, 30, 30, 0.1)",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        fill="currentColor"
                        className="opacity-75"
                      />
                    </svg>
                    Processando...
                  </span>
                ) : (
                  "IR PARA O CHECKOUT"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalContentIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .checkout-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 14px 16px;
          color: white;
          font-size: 14px;
          font-family: var(--font-heading), system-ui, sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .checkout-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }
        .checkout-input:focus {
          border-color: rgba(196, 30, 30, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(196, 30, 30, 0.1);
        }
        .country-dropdown-list {
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
}
