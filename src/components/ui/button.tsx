import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap";

const sizes = { sm: "h-9 px-4", md: "min-h-11 px-5" } as const;

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg shadow-[0_0_0_1px_var(--border-strong),0_8px_30px_-8px_var(--glow-1)] hover:shadow-[0_0_0_1px_var(--brand),0_10px_40px_-6px_var(--glow-1)] hover:-translate-y-px",
  secondary:
    "border border-border-strong bg-bg-elevated/60 text-fg backdrop-blur hover:border-brand/60 hover:bg-bg-elevated",
  ghost: "text-fg-muted hover:text-fg",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  external?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", size = "md", external, className }: ButtonLinkProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={classes}>
      {children}
    </Link>
  );
}
