import { ArrowRight } from "lucide-react";
import { BuiltOn } from "@/components/marketing/built-on";
import { CodeShowcase } from "@/components/marketing/code-showcase";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { CtaBand } from "@/components/marketing/cta-band";
import { FaqList } from "@/components/marketing/faq-list";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { Pillars } from "@/components/marketing/pillars";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { RoadmapTimeline } from "@/components/marketing/roadmap-timeline";
import { SecureDefaults } from "@/components/marketing/secure-defaults";
import { StatsBand } from "@/components/marketing/stats-band";
import { Tenancy } from "@/components/marketing/tenancy";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { previewRowCount } from "@/content/comparison";
import { faq } from "@/content/faq";
import { softwareApplicationLd, softwareSourceCodeLd } from "@/lib/jsonld";
import { linkTo } from "@/lib/links";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";

export const metadata = buildMetadata(pages.home);

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 flex justify-center">
      <ButtonLink href={href} variant="secondary">
        {children}
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </ButtonLink>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BuiltOn />
      <Pillars />
      <SecureDefaults />
      <CodeShowcase />
      <Tenancy />
      <FeatureGrid />
      <StatsBand />

      <Section
        id="compare"
        eyebrow="Compare"
        title="Own your identity layer"
        description="Keep users and keys in your own infrastructure, without per-user pricing or license keys, and without writing a protocol engine yourself."
      >
        <ComparisonTable limit={previewRowCount} />
        <MoreLink href={linkTo("compare")}>See the full comparison</MoreLink>
      </Section>

      <Section
        id="roadmap"
        eyebrow="Roadmap"
        title="Built in public, milestone by milestone"
        description="The core token server is built and tested. Users, MFA and passkeys are being built now."
      >
        <RoadmapTimeline />
        <MoreLink href={linkTo("roadmap")}>View the full roadmap</MoreLink>
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Free forever. Really."
        description="The whole identity provider is Apache-2.0. Enterprises can work with us directly."
      >
        <PricingCards />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Questions, answered">
        <FaqList items={faq.filter((item) => item.top)} />
        <MoreLink href={linkTo("faq")}>All questions</MoreLink>
      </Section>

      <CtaBand />

      <JsonLd data={softwareApplicationLd()} />
      <JsonLd data={softwareSourceCodeLd()} />
    </>
  );
}
