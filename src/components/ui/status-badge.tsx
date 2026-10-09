import { CheckCircle2, Clock3, Telescope } from "lucide-react";
import type { Horizon, Status } from "@/content/types";
import { cn } from "@/lib/cn";

export const statusLabels: Record<Status, string> = {
  available: "Available",
  "in-progress": "In progress",
  roadmap: "Roadmap",
};

const styles: Record<Status | "later", string> = {
  available: "text-ok bg-ok-bg ring-ok/25",
  "in-progress": "text-wip bg-wip-bg ring-wip/25",
  roadmap: "text-plan bg-plan-bg ring-plan/25",
  later: "text-later bg-later-bg ring-later/25",
};

interface StatusBadgeProps {
  status: Status;
  horizon?: Horizon;
  className?: string;
  size?: "sm" | "md";
}

/** Always icon + text + color, never color alone. */
export function StatusBadge({ status, horizon, className, size = "sm" }: StatusBadgeProps) {
  const later = status === "roadmap" && horizon === "later";
  const tone = later ? "later" : status;
  const label = later ? "Later" : statusLabels[status];
  const icon = size === "sm" ? "size-3" : "size-3.5";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full font-medium ring-1 ring-inset",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        styles[tone],
        className,
      )}
    >
      {status === "available" && <CheckCircle2 aria-hidden className={icon} />}
      {status === "in-progress" && (
        <span aria-hidden className="relative mx-0.5 size-1.5 animate-pulse-dot rounded-full bg-wip" />
      )}
      {status === "roadmap" && (later ? <Telescope aria-hidden className={icon} /> : <Clock3 aria-hidden className={icon} />)}
      {label}
    </span>
  );
}
