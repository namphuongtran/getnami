import { SpecTag } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Feature } from "@/content/types";

export function FeatureCard({ feature, showEvidence }: { feature: Feature; showEvidence?: boolean }) {
  return (
    <article
      data-status={feature.status}
      className="card group flex h-full flex-col p-5 transition-colors hover:border-border-strong"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold tracking-tight">{feature.title}</h3>
        <StatusBadge status={feature.status} horizon={feature.horizon} />
      </div>
      <p className="mt-2 flex-1 text-sm text-fg-muted">{feature.summary}</p>
      {(feature.specs?.length || (showEvidence && feature.evidence)) && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {feature.specs?.map((spec) => (
            <SpecTag key={spec}>{spec}</SpecTag>
          ))}
          {showEvidence && feature.evidence && (
            <span className="truncate font-mono text-[10px] text-fg-subtle" title={feature.evidence}>
              {feature.evidence}
            </span>
          )}
        </div>
      )}
    </article>
  );
}
