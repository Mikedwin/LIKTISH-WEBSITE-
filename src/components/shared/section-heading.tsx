import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  variant?: "standard" | "feature" | "compact";
  tone?: "dark" | "light";
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  variant = "standard",
  tone = "dark",
}: SectionHeadingProps) {
  const wrapperClass =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  const eyebrowClass =
    tone === "light" ? "eyebrow text-white/72" : "eyebrow text-brand-soft";
  const titleClass =
    variant === "feature"
      ? "headline text-3xl font-black tracking-tight sm:text-4xl md:text-6xl"
      : variant === "compact"
        ? "headline text-[1.65rem] font-black tracking-tight sm:text-2xl md:text-3xl"
        : "headline text-[2rem] font-black tracking-tight sm:text-3xl md:text-5xl";
  const bodyClass =
    tone === "light"
      ? "mt-4 text-[0.98rem] leading-7 text-white/78 sm:mt-5 sm:text-base md:text-lg"
      : "prose-copy mt-4 text-[0.98rem] sm:mt-5 sm:text-base md:text-lg";

  return (
    <div className={wrapperClass}>
      {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
      <h2 className={cn(titleClass, tone === "light" ? "text-white" : "text-brand")}>
        {title}
      </h2>
      {body ? <p className={bodyClass}>{body}</p> : null}
    </div>
  );
}
