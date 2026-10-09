"use client";

import { useState, type ReactNode } from "react";
import type { Status } from "@/content/types";
import { cn } from "@/lib/cn";

type Filter = "all" | Status;

interface FeatureFilterProps {
  counts: Record<Filter, number>;
  children: ReactNode;
}

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "in-progress", label: "In progress" },
  { value: "roadmap", label: "Roadmap" },
];

/** Sets data-filter on a wrapper; CSS in globals.css hides cards that do not match. */
export function FeatureFilter({ counts, children }: FeatureFilterProps) {
  const [filter, setFilter] = useState<Filter>("all");
  return (
    <div data-filter={filter}>
      <div role="group" aria-label="Filter by status" className="sticky top-16 z-20 -mx-4 mb-10 flex gap-2 overflow-x-auto bg-bg/80 px-4 py-3 backdrop-blur sm:mx-0 sm:flex-wrap sm:rounded-full sm:px-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
            className={cn(
              "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
              filter === option.value
                ? "border-fg bg-fg text-bg"
                : "border-border-strong text-fg-muted hover:border-fg-subtle hover:text-fg",
            )}
          >
            {option.label}
            <span className={cn("font-mono text-xs", filter === option.value ? "text-bg/70" : "text-fg-subtle")}>
              {counts[option.value]}
            </span>
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
