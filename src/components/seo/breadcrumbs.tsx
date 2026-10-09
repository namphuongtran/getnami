import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { breadcrumbLd } from "@/lib/jsonld";
import { pages, type PageInfo } from "@/lib/routes";
import { JsonLd } from "./json-ld";

/** Visible breadcrumbs plus the matching BreadcrumbList structured data. */
export function Breadcrumbs({ trail }: { trail: PageInfo[] }) {
  const full = [pages.home, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle">
        <ol className="flex flex-wrap items-center gap-1">
          {full.map((page, index) => {
            const last = index === full.length - 1;
            return (
              <li key={page.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="text-fg-muted">
                    {page.name}
                  </span>
                ) : (
                  <>
                    <Link href={(page.path.replace(/\/$/, "") || "/") as Route} className="hover:text-fg">
                      {page.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(full)} />
    </>
  );
}
