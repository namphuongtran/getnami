import type { Metadata } from "next";
import { Waves } from "@/components/marketing/waves";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { linkTo } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-glow absolute inset-x-0 -top-40 -z-10 h-[600px]" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm text-brand">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">This wave has already passed</h1>
        <p className="mt-4 max-w-md text-fg-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href={linkTo("features")} variant="secondary">
            Browse features
          </ButtonLink>
        </div>
      </Container>
      <Waves />
    </section>
  );
}
