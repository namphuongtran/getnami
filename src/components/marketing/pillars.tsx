import { Building2, Cloud, Cpu, KeyRound, LayoutDashboard, Scale, type LucideIcon } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Section } from "@/components/ui/section";
import { getFeature } from "@/content/features";
import { pillars, type PillarIcon } from "@/content/pillars";

const icons: Record<PillarIcon, LucideIcon> = {
  scale: Scale,
  engine: Cpu,
  tenants: Building2,
  key: KeyRound,
  cloud: Cloud,
  admin: LayoutDashboard,
};

export function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-accent/20 text-brand ring-1 ring-brand/20 ring-inset">
      <Icon aria-hidden className="size-5" />
    </span>
  );
}

export function Pillars() {
  return (
    <Section
      id="why"
      eyebrow="Why Nami"
      title="An identity provider you can own"
      description="Everything a serious identity platform needs, in the open, on the .NET stack your team already runs."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="card reveal group flex flex-col p-6 transition-colors hover:border-border-strong">
            <IconTile icon={icons[pillar.icon]} />
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{pillar.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{pillar.body}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-4">
              {pillar.features?.map((id) => {
                const feature = getFeature(id);
                return (
                  <li key={id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-fg-muted">{feature.title}</span>
                    <StatusBadge status={feature.status} horizon={feature.horizon} />
                  </li>
                );
              })}
              {pillar.points?.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-fg-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
