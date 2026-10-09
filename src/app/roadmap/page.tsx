import { CtaBand } from "@/components/marketing/cta-band";
import { PageHeader } from "@/components/marketing/page-header";
import { PhaseList, RoadmapTimeline } from "@/components/marketing/roadmap-timeline";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { currentPhase, milestoneFeatures, milestones, milestoneStatus, phases } from "@/content/milestones";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";
import { formatDate, site } from "@/lib/site";

export const metadata = buildMetadata(pages.roadmap);

export default function RoadmapPage() {
  const later = milestoneFeatures("later");
  return (
    <>
      <PageHeader
        page={pages.roadmap}
        title={
          <>
            From core protocol <span className="text-gradient">to OpenID certification</span>
          </>
        }
        lead={`Five milestones take Nami from a token server to a complete, certified identity provider. Milestone M1 is built; Phase ${currentPhase}, ${phases[currentPhase].title.toLowerCase()}, is being built now.`}
      >
        <p className="mt-6 font-mono text-xs text-fg-subtle">
          Checked {formatDate(site.statusAsOf)} against nami@{site.sourceCommit}. Milestones have no dates; they ship when
          they are done and tested.
        </p>
      </PageHeader>

      <Section align="left" eyebrow="Milestones" title="The path to v1">
        <RoadmapTimeline />
      </Section>

      <Section align="left" eyebrow="In detail" title="What each milestone delivers" className="pt-0 sm:pt-0">
        <div className="space-y-6">
          {milestones.map((milestone) => {
            const items = milestoneFeatures(milestone.id);
            const current = milestone.phases.includes(currentPhase);
            return (
              <article
                key={milestone.id}
                id={milestone.id.toLowerCase()}
                className={cn("reveal rounded-2xl p-6 sm:p-8", current ? "border-gradient" : "card")}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-brand">{milestone.id}</span>
                  <h3 className="text-xl font-semibold tracking-tight">{milestone.title}</h3>
                  <StatusBadge status={milestoneStatus(milestone.id)} size="md" />
                  {current && (
                    <span className="rounded-full bg-fg px-2 py-0.5 text-[11px] font-semibold text-bg">You are here</span>
                  )}
                </div>
                <p className="mt-2 max-w-3xl text-sm text-fg-muted">{milestone.scope}</p>
                <p className="mt-2 font-mono text-xs text-fg-subtle">
                  Phases: {milestone.phases.map((p) => `${p} ${phases[p].title}`).join(" · ")}
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {items.map((feature) => (
                    <li key={feature.id} className="flex items-center justify-between gap-3 border-b border-border py-2 text-sm">
                      <span className="text-fg-muted">{feature.title}</span>
                      <StatusBadge status={feature.status} />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        align="left"
        eyebrow="Build phases"
        title="Nine phases under the milestones"
        description="Phases follow the dependency order of the design. Phase 09, testing and deployment, runs alongside every milestone."
        className="pt-0 sm:pt-0"
      >
        <PhaseList />
      </Section>

      <Section
        align="left"
        eyebrow="After v1"
        title="Proposed for later"
        description="Each of these is proposed for after v1 and gets built when demand appears. Tell us which ones matter to you."
        className="pt-0 sm:pt-0"
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {later.map((feature) => (
            <li key={feature.id} className="card reveal p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">{feature.title}</p>
                <StatusBadge status={feature.status} horizon={feature.horizon} />
              </div>
              <p className="mt-1 text-xs text-fg-muted">{feature.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
