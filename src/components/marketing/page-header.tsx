import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/section";
import type { PageInfo } from "@/lib/routes";

interface PageHeaderProps {
  page: PageInfo;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
  trail?: PageInfo[];
}

/** The top of every inner page: breadcrumbs, the single <h1>, a lead paragraph. */
export function PageHeader({ page, title, lead, children, trail }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="hero-glow absolute inset-x-0 -top-48 h-[520px] opacity-80" />
        <div className="bg-dots absolute inset-0" />
      </div>
      <Container className="py-14 sm:py-20">
        <Breadcrumbs trail={trail ?? [page]} />
        <Eyebrow className="mt-8">{page.eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-pretty text-fg-muted">{lead}</p>
        {children}
      </Container>
    </section>
  );
}
