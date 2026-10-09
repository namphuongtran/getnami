import { cn } from "@/lib/cn";

// Two seamless wave layers drifting sideways. "Nami" means wave in Japanese.
const path =
  "M0 40 C 150 10 250 70 400 40 S 650 10 800 40 S 1050 70 1200 40 S 1450 10 1600 40 V 120 H 0 Z";

export function Waves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden", className)}>
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%] animate-wave-slow opacity-50">
        <path d={path} fill="color-mix(in oklch, var(--accent) 14%, transparent)" />
      </svg>
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" className="absolute -bottom-3 h-full w-[200%] animate-wave opacity-70" style={{ animationDirection: "reverse" }}>
        <path d={path} fill="color-mix(in oklch, var(--brand) 12%, transparent)" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
