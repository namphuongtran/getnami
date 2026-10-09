import { StatusBadge } from "@/components/ui/status-badge";
import { currentPhase, milestones, milestoneStatus, phases } from "@/content/milestones";
import { cn } from "@/lib/cn";

/** Compact horizontal timeline for the landing page. */
export function RoadmapTimeline() {
  return (
    <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-5">
      <div aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-gradient-to-r from-ok via-wip to-plan/40 md:block" />
      {milestones.map((milestone) => {
        const status = milestoneStatus(milestone.id);
        const current = milestone.phases.includes(currentPhase);
        return (
          <li key={milestone.id} className="reveal relative">
            <div
              className={cn(
                "relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-xs font-semibold",
                status === "available" && "border-ok/40 bg-ok-bg text-ok",
                status === "in-progress" && "border-wip/50 bg-wip-bg text-wip",
                status === "roadmap" && "border-border-strong bg-bg-elevated text-fg-muted",
              )}
            >
              {milestone.id}
            </div>
            <div className={cn("card mt-4 p-4", current && "border-gradient")}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">{milestone.title}</h3>
                {current && (
                  <span className="rounded-full bg-fg px-2 py-0.5 text-[10px] font-semibold text-bg">You are here</span>
                )}
              </div>
              <p className="mt-2 text-xs text-fg-muted">{milestone.scope}</p>
              <div className="mt-3">
                <StatusBadge status={status} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function PhaseList() {
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.values(phases).map((phase) => (
        <li key={phase.id} className={cn("card p-4", phase.id === currentPhase && "border-gradient")}>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-xs text-fg-subtle">Phase {phase.id}</p>
            <StatusBadge status={phase.status} />
          </div>
          <h3 className="mt-2 text-sm font-semibold">{phase.title}</h3>
          <p className="mt-1 text-xs text-fg-muted">{phase.scope}</p>
        </li>
      ))}
    </ol>
  );
}
