import type { CodeSample } from "@/content/code-samples";
import { cn } from "@/lib/cn";
import { highlight } from "@/lib/shiki";
import { CopyButton } from "./copy-button";

/** Highlighted code, rendered at build time. */
export async function CodeBody({ sample, className }: { sample: CodeSample; className?: string }) {
  const html = await highlight(sample.code, sample.lang);
  return (
    <div
      className={cn("overflow-x-auto p-4 sm:p-5", className)}
      // Shiki output is generated at build time from code in this repository.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function WindowDots() {
  return (
    <div aria-hidden className="flex gap-1.5">
      <span className="size-2.5 rounded-full bg-fg/15" />
      <span className="size-2.5 rounded-full bg-fg/15" />
      <span className="size-2.5 rounded-full bg-fg/15" />
    </div>
  );
}

interface CodeWindowProps {
  sample: CodeSample;
  className?: string;
  showSource?: boolean;
}

export async function CodeWindow({ sample, className, showSource }: CodeWindowProps) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-code-bg shadow-2xl shadow-black/10", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <WindowDots />
          <span className="truncate font-mono text-xs text-fg-subtle">{sample.file}</span>
        </div>
        <CopyButton text={sample.code.trim()} />
      </div>
      <CodeBody sample={sample} />
      {showSource && (
        <figcaption className="border-t border-border px-4 py-2 font-mono text-[11px] text-fg-subtle">
          Source: nami/{sample.source}
        </figcaption>
      )}
    </figure>
  );
}
