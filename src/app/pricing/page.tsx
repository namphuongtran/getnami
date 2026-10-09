import { FaqList } from "@/components/marketing/faq-list";
import { PageHeader } from "@/components/marketing/page-header";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { Section } from "@/components/ui/section";
import { faq } from "@/content/faq";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";

export const metadata = buildMetadata(pages.pricing);

const pricingQuestions = faq.filter((item) =>
  ["How is Nami licensed? Will it stay free?", "Is there commercial support?", "Can I move from a commercial identity server to Nami?"].includes(
    item.question,
  ),
);

export default function PricingPage() {
  return (
    <>
      <PageHeader
        page={pages.pricing}
        title={
          <>
            Free forever, <span className="text-gradient">with a partner when you need one</span>
          </>
        }
        lead="Every feature of the identity provider is Apache-2.0. No per-user fees, no per-client fees, no license keys. Enterprises can work with us directly."
      />
      <Section>
        <h2 className="sr-only">Plans</h2>
        <PricingCards />
      </Section>
      <Section eyebrow="Questions" title="About pricing" className="pt-0 sm:pt-0">
        <FaqList items={pricingQuestions} />
      </Section>
    </>
  );
}
