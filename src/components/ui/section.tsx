import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "center" | "left";
}

export function Section({ id, eyebrow, title, description, children, className, align = "center" }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <div className={cn("reveal mb-12 max-w-3xl sm:mb-16", align === "center" && "mx-auto text-center")}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-pretty text-fg-muted sm:text-lg">{description}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase", className)}>
      {children}
    </p>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-xs text-fg-muted backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SpecTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">
      {children}
    </span>
  );
}
