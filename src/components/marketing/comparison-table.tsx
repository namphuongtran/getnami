import { Check, Minus, X } from "lucide-react";
import { columns, rows, type Cell } from "@/content/comparison";
import { cn } from "@/lib/cn";

function CellView({ cell }: { cell: Cell }) {
  if (cell === "yes")
    return (
      <span className="inline-flex items-center gap-1 text-ok">
        <Check aria-hidden className="size-4" />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (cell === "no")
    return (
      <span className="inline-flex items-center gap-1 text-fg-subtle">
        <X aria-hidden className="size-4" />
        <span className="sr-only">No</span>
      </span>
    );
  if (cell === "partial")
    return (
      <span className="inline-flex items-center gap-1 text-wip">
        <Minus aria-hidden className="size-4" />
        <span className="sr-only">Partly</span>
      </span>
    );
  const tone = cell.tone === "yes" ? "text-fg" : cell.tone === "no" ? "text-fg-subtle" : "text-fg-muted";
  return <span className={cn("text-sm", tone)}>{cell.text}</span>;
}

export function ComparisonTable({ limit }: { limit?: number }) {
  const shown = limit ? rows.slice(0, limit) : rows;
  return (
    <div className="reveal">
      <div className="card relative overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">Nami compared with other ways to get an identity provider</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="sticky left-0 z-10 bg-bg-elevated px-5 py-4 font-medium text-fg-muted">
                <span className="sr-only">Capability</span>
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn("px-5 py-4 align-bottom", column.key === "nami" && "bg-brand/[0.06]")}
                >
                  <span className={cn("block font-semibold", column.key === "nami" ? "text-brand" : "text-fg")}>
                    {column.title}
                  </span>
                  <span className="block text-xs font-normal text-fg-subtle">{column.note}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shown.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="sticky left-0 z-10 bg-bg-elevated px-5 py-3.5 font-normal text-fg-muted">
                  {row.label}
                </th>
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-5 py-3.5", column.key === "nami" && "bg-brand/[0.06]")}>
                    <CellView cell={row.cells[column.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-fg-subtle">
        Categories describe typical offerings. Individual products differ; check the terms of any product you evaluate.
      </p>
    </div>
  );
}
