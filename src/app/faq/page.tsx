import { CtaBand } from "@/components/marketing/cta-band";
import { FaqList } from "@/components/marketing/faq-list";
import { PageHeader } from "@/components/marketing/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { faq } from "@/content/faq";
import { faqLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";

export const metadata = buildMetadata(pages.faq);

export default function FaqPage() {
  return (
    <>
      <PageHeader
        page={pages.faq}
        title="Frequently asked questions"
        lead="Licensing, project status, the relationship with OpenIddict, databases, tenancy and migration. If your question is missing, ask us."
      />
      <Section>
        <FaqList items={faq} />
      </Section>
      <CtaBand />
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
