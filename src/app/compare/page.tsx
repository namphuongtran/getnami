import { ComparisonTable } from "@/components/marketing/comparison-table";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHeader } from "@/components/marketing/page-header";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";

export const metadata = buildMetadata(pages.compare);

const fits = [
  {
    title: "Choose Nami when",
    items: [
      "You build on .NET and want identity in the same stack, repository and pipeline",
      "Users, keys and audit records must stay in your own infrastructure",
      "You serve many tenants or customers from one deployment",
      "Per-user pricing or license keys do not fit your growth",
    ],
  },
  {
    title: "Nami may not fit yet when",
    items: [
      "You need a finished admin UI or login pages today; both are on the roadmap",
      "You depend on SAML 2.0, SCIM or Windows authentication; these are proposed after v1",
      "You want someone else to run identity for you around the clock",
      "Your database standard is not PostgreSQL",
    ],
  },
];

export default function ComparePage() {
  return (
    <>
      <PageHeader
        page={pages.compare}
        title={
          <>
            Open source, self-hosted, <span className="text-gradient">and yours</span>
          </>
        }
        lead="There are four common ways to get an identity provider. Here is how they typically compare, and where Nami fits."
      />

      <Section align="left" eyebrow="At a glance" title="How the options compare">
        <ComparisonTable />
      </Section>

      <Section align="left" eyebrow="Fit" title="An honest fit check" className="pt-0 sm:pt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fits.map((fit) => (
            <div key={fit.title} className="card reveal p-6">
              <h3 className="font-semibold tracking-tight">{fit.title}</h3>
              <ul className="mt-4 space-y-3">
                {fit.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-fg-muted">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
