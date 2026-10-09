"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "./copy-button";

export interface CodeTab {
  id: string;
  label: string;
  caption: string;
  source: string;
  code: string;
  /** Server-rendered, highlighted body. */
  body: ReactNode;
}

/** Accessible tabs. Every panel is server-rendered; this only toggles which one is visible. */
export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-code-bg shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between gap-2 border-b border-border pr-2">
        <div role="tablist" aria-label="Code samples" className="flex min-w-0 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative min-h-11 shrink-0 px-4 font-mono text-xs transition-colors",
                active === index ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
              )}
            >
              {tab.label}
              {active === index && (
                <span aria-hidden className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-brand to-accent" />
              )}
            </button>
          ))}
        </div>
        <CopyButton text={tabs[active].code} />
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
        >
          {tab.body}
          <p className="border-t border-border px-4 py-2.5 text-xs text-fg-subtle">
            {tab.caption} <span className="font-mono opacity-80">nami/{tab.source}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
