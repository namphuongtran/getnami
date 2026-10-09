import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { FeatureFilter } from "@/components/marketing/feature-filter";
import { PageHeader } from "@/components/marketing/page-header";
import { Container } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { categories, features } from "@/content/features";
import type { Category, Feature } from "@/content/types";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";
import { formatDate, site } from "@/lib/site";

export const metadata = buildMetadata(pages.features);

const statusOrder = { available: 0, "in-progress": 1, roadmap: 2 } as const;

function sortFeatures(items: Feature[]): Feature[] {
  return [...items].sort(
    (a, b) =>
      statusOrder[a.status] - statusOrder[b.status] ||
      (a.horizon === b.horizon ? 0 : a.horizon === "v1" ? -1 : 1),
  );
}

export default function FeaturesPage() {
  const all: Feature[] = [...features];
  const counts = {
    all: all.length,
    available: all.filter((f) => f.status === "available").length,
    "in-progress": all.filter((f) => f.status === "in-progress").length,
    roadmap: all.filter((f) => f.status === "roadmap").length,
  };

  return (
    <>
      <PageHeader
        page={pages.features}
        title={
          <>
            Every feature, <span className="text-gradient">with its real status</span>
          </>
        }
        lead="Nami is built in public, so this catalogue tells you exactly what you can use today, what is being built right now and what is planned."
      >
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-fg-muted">
          <StatusBadge status="available" size="md" /> built and tested
          <StatusBadge status="in-progress" size="md" /> being built now
          <StatusBadge status="roadmap" size="md" /> planned for v1
          <StatusBadge status="roadmap" horizon="later" size="md" /> proposed after v1
        </div>
        <p className="mt-6 font-mono text-xs text-fg-subtle">
          Checked {formatDate(site.statusAsOf)} against nami@{site.sourceCommit}
        </p>
      </PageHeader>

      <Container className="py-16">
        <FeatureFilter counts={counts}>
          <div className="space-y-16">
            {(Object.keys(categories) as Category[]).map((category) => {
              const items = sortFeatures(all.filter((f) => f.category === category));
              if (items.length === 0) return null;
              const statusCounts = {
                available: items.filter((f) => f.status === "available").length,
                "in-progress": items.filter((f) => f.status === "in-progress").length,
                roadmap: items.filter((f) => f.status === "roadmap").length,
              };
              return (
                <section
                  key={category}
                  id={category}
                  aria-labelledby={`${category}-title`}
                  data-count-available={statusCounts.available}
                  data-count-in-progress={statusCounts["in-progress"]}
                  data-count-roadmap={statusCounts.roadmap}
                >
                  <div className="mb-6 max-w-2xl">
                    <h2 id={`${category}-title`} className="text-2xl font-semibold tracking-tight">
                      {categories[category].title}
                    </h2>
                    <p className="mt-1 text-sm text-fg-muted">{categories[category].blurb}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((feature) => (
                      <FeatureCard key={feature.id} feature={feature} showEvidence />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </FeatureFilter>
      </Container>
      <CtaBand />
    </>
  );
}
