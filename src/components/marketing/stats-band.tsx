import { Container } from "@/components/ui/section";
import { stats } from "@/content/stats";

export function StatsBand() {
  return (
    <section aria-label="Project in numbers" className="py-8">
      <Container>
        <dl className="card grid grid-cols-2 divide-border overflow-hidden md:grid-cols-4 md:divide-x">
          {stats.map((stat) => (
            <div key={stat.label} className="reveal p-6 text-center sm:p-8" title={stat.source}>
              <dt className="text-xs text-fg-muted sm:text-sm">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="text-gradient">{stat.value}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-center text-[11px] text-fg-subtle">
          Test count from the Phase 03 suite run on 2026-10-04. Hover a number for its source.
        </p>
      </Container>
    </section>
  );
}
