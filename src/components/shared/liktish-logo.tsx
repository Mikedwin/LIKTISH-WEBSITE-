import type { SVGProps } from "react";

type LogoProps = {
  className?: string;
};

function LiktishMarkSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 112 128" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="liktishCoreGlow" cx="40%" cy="20%" r="82%">
          <stop offset="0%" stopColor="#fffcca" />
          <stop offset="58%" stopColor="#fff07a" />
          <stop offset="100%" stopColor="#f2d94a" />
        </radialGradient>
      </defs>

      <ellipse
        cx="56"
        cy="64"
        rx="44"
        ry="54"
        fill="#fffdf1"
        stroke="#ff2b17"
        strokeWidth="3.2"
      />
      <ellipse
        cx="56"
        cy="64"
        rx="41"
        ry="51"
        fill="none"
        stroke="#ff2b17"
        strokeWidth="2"
      />
      <ellipse cx="56" cy="64" rx="38" ry="48" fill="url(#liktishCoreGlow)" opacity="0.98" />

      <path
        d="M21 59c15-20 31-31 51-35M24 69c13-17 27-27 46-32M29 79c10-13 20-21 35-26"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="4.4"
        strokeLinecap="round"
        opacity="0.98"
      />
      <path
        d="M22 36c11-13 25-18 41-18 10 0 20 3 28 8"
        fill="none"
        stroke="#d39a2f"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M27 43 15 30M36 37 26 22M46 32 38 18M58 31l-1-15"
        fill="none"
        stroke="#d39a2f"
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.82"
      />

      <path d="M26 95V54" fill="none" stroke="#49106f" strokeWidth="7" strokeLinecap="square" />
      <path d="M26 95h16" fill="none" stroke="#49106f" strokeWidth="7" strokeLinecap="square" />

      <path d="M42 95V56" fill="none" stroke="#ff1f12" strokeWidth="7" strokeLinecap="square" />
      <path d="M42 74 58 58" fill="none" stroke="#ff1f12" strokeWidth="7" strokeLinecap="square" />
      <path d="M42 77 60 95" fill="none" stroke="#ff1f12" strokeWidth="7" strokeLinecap="square" />

      <path d="M42 64H77" fill="none" stroke="#0d2dd8" strokeWidth="7" strokeLinecap="square" />
      <path d="M58 58v37" fill="none" stroke="#0d2dd8" strokeWidth="7" strokeLinecap="square" />

      <path
        d="M67 61c3-4 8-6 13-6 7 0 12 3 14 7M66 77c3-4 9-6 15-6 7 0 12 3 13 8 0 9-8 15-18 15-6 0-12-2-16-6"
        fill="none"
        stroke="#ff2b17"
        strokeWidth="6.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M76 55v40" fill="none" stroke="#0d2dd8" strokeWidth="7" strokeLinecap="square" />
      <path d="M95 55v40" fill="none" stroke="#0d2dd8" strokeWidth="7" strokeLinecap="square" />
      <path d="M76 75h19" fill="none" stroke="#0d2dd8" strokeWidth="7" strokeLinecap="square" />
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
