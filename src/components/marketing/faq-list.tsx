import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/** Native <details>: accessible, works without JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium [&::-webkit-details-marker]:hidden">
            <h3 className="text-base">{item.question}</h3>
            <Plus aria-hidden className="size-5 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-fg-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
