import { ArrowRight, Bell } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { testimonials } from "@/content/proof";
import { env } from "@/lib/env";
import { linkTo, primaryCta } from "@/lib/links";
import { mailto, site } from "@/lib/site";
import { Waves } from "./waves";

function Updates() {
  if (env.newsletterFormAction) {
    return (
      <form action={env.newsletterFormAction} method="post" target="_blank" className="mx-auto mt-8 flex max-w-md gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="min-h-11 flex-1 rounded-full border border-border-strong bg-bg/70 px-4 text-sm placeholder:text-fg-subtle"
        />
        <button type="submit" className="min-h-11 rounded-full bg-fg px-5 text-sm font-medium text-bg">
          Get updates
        </button>
      </form>
    );
  }
  return (
    <p className="mt-8 flex items-center justify-center gap-2 text-sm text-fg-muted">
      <Bell aria-hidden className="size-4" />
      {site.repoPublic ? (
        <a href={`${site.repoUrl}/releases`} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-fg hover:underline">
          Watch releases on GitHub for milestone updates
        </a>
      ) : (
        <a href={mailto("Nami updates")} className="underline-offset-4 hover:text-fg hover:underline">
          Email us to hear when milestones ship
        </a>
      )}
    </p>
  );
}

export function CtaBand() {
  const cta = primaryCta();
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="border-gradient relative isolate overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="hero-glow absolute inset-0 -z-10 opacity-70" />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Help shape the identity provider .NET deserves
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-fg-muted">
            {testimonials.length === 0
              ? "We are looking for early adopters and design partners. Bring your requirements and we will build with you."
              : "Join the teams building with Nami."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={cta.href} external={cta.external}>
              {cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={linkTo("pricing")} variant="secondary">
              Enterprise partnership
            </ButtonLink>
          </div>
          <Updates />
          <Waves className="h-20 opacity-60" />
        </div>
      </Container>
    </section>
  );
}
