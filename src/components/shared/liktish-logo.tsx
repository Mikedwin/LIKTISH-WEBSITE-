import type { SVGProps } from "react";

type LogoProps = {
  className?: string;
};

function LiktishMarkSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 112 128" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="liktishCoreGlow" cx="40%" cy="22%" r="80%">
          <stop offset="0%" stopColor="#fff8b8" />
          <stop offset="55%" stopColor="#f8eb78" />
          <stop offset="100%" stopColor="#e5c84d" />
        </radialGradient>
        <linearGradient id="liktishGlassFade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.42)" />
        </linearGradient>
      </defs>

      <ellipse
        cx="56"
        cy="64"
        rx="44"
        ry="54"
        fill="#fffdf1"
        stroke="#19A875"
        strokeWidth="3.5"
      />
      <ellipse
        cx="56"
        cy="64"
        rx="39"
        ry="49"
        fill="url(#liktishCoreGlow)"
        opacity="0.96"
      />
      <ellipse
        cx="56"
        cy="64"
        rx="39"
        ry="49"
        fill="url(#liktishGlassFade)"
        opacity="0.52"
      />

      <path
        d="M23 35c11-13 24-18 40-18 11 0 21 3 29 8"
        fill="none"
        stroke="#d39a2f"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M18 60c16-20 32-31 52-35M22 71c14-17 27-27 45-33M28 81c11-14 21-22 35-27"
        fill="none"
        stroke="rgba(255,255,255,0.86)"
        strokeWidth="4.4"
        strokeLinecap="round"
        opacity="0.92"
      />
      <path
        d="M28 42 16 28M37 36 27 20M47 31 40 16M59 29l-1-16"
        fill="none"
        stroke="#d39a2f"
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.82"
      />

      <path
        d="M26 95V50h8v38h18"
        fill="none"
        stroke="#0f6e57"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 50v45M50 72l17-22M50 72l17 19"
        fill="none"
        stroke="#19A875"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 57c3-4 7-6 12-6 6 0 11 2 14 6m-26 25c3 4 8 7 13 7 6 0 11-3 14-7m-25-12h22"
        fill="none"
        stroke="#d35f27"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M76 51v44M97 51v44M76 71h21"
        fill="none"
        stroke="#1b3ba8"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LiktishWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="min-w-0">
      <span
        className={`block truncate font-[Georgia,serif] font-bold uppercase leading-none text-brand ${
          compact
            ? "text-[1.3rem] tracking-[0.02em] sm:text-[1.55rem]"
            : "text-[1.85rem] tracking-[0.03em] sm:text-[2.1rem]"
        }`}
      >
        LIKTISH
      </span>
      <span
        className={`mt-1 block rounded-full bg-[#d39a2f]/80 ${
          compact ? "h-[2px] w-20 sm:w-24" : "h-[2.5px] w-28 sm:w-32"
        }`}
      />
      <span
        className={`mt-2 block uppercase text-[#5e7269] ${
          compact
            ? "text-[0.54rem] font-extrabold tracking-[0.28em] sm:text-[0.6rem]"
            : "text-[0.68rem] font-extrabold tracking-[0.28em] sm:text-[0.74rem]"
        }`}
      >
        Engineering
      </span>
    </span>
  );
}

export function LiktishNavbarLogo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="inline-flex h-12 w-11 shrink-0 items-center justify-center sm:h-14 sm:w-12">
        <LiktishMarkSvg className="h-full w-full drop-shadow-[0_8px_18px_rgba(20,55,43,0.12)]" />
      </span>
      <LiktishWordmark compact />
    </span>
  );
}

export function LiktishFooterLogo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <span className="inline-flex h-24 w-20 shrink-0 items-center justify-center sm:h-28 sm:w-24">
        <LiktishMarkSvg className="h-full w-full drop-shadow-[0_14px_28px_rgba(20,55,43,0.12)]" />
      </span>
      <div className="min-w-0">
        <LiktishWordmark />
        <span className="mt-3 block text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#7a8d84] sm:text-[0.82rem]">
          Solar
        </span>
      </div>
    </span>
  );
}
