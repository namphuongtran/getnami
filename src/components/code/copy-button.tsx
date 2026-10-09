"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      className="inline-flex size-9 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-bg-subtle hover:text-fg"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check aria-hidden className="size-4 text-ok" /> : <Copy aria-hidden className="size-4" />}
    </button>
  );
}
