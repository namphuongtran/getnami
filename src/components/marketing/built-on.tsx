import { Container } from "@/components/ui/section";

const names = [".NET 10", "ASP.NET Core", "OpenIddict", "PostgreSQL", "EF Core", "Data Protection", "OpenTelemetry"];

export function BuiltOn() {
  return (
    <section aria-label="Built on" className="border-y border-border bg-bg-subtle/40 py-10">
      <Container>
        <p className="text-center text-xs tracking-[0.18em] text-fg-subtle uppercase">
          Built on the open-source .NET stack you already trust
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {names.map((name) => (
            <li key={name} className="text-lg font-semibold tracking-tight text-fg-muted/70 transition-colors hover:text-fg sm:text-xl">
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
