import { ArrowDown, Database, Globe, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";

function Request({ host }: { host: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-subtle px-3 py-2 font-mono text-xs">
      <Globe aria-hidden className="size-3.5 shrink-0 text-brand" />
      <span className="truncate">{host}</span>
    </div>
  );
}

function Tenant({ name, tone }: { name: string; tone: "brand" | "accent" | "ok" }) {
  const color = { brand: "bg-brand", accent: "bg-accent", ok: "bg-ok" }[tone];
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-2.5 py-1.5 text-xs">
      <span aria-hidden className={`size-2 rounded-full ${color}`} />
      <span className="font-mono">{name}</span>
    </div>
  );
}

function Db({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-strong bg-bg-subtle/60 p-4">
      <div className="flex items-center gap-2 text-xs text-fg-muted">
        <Database aria-hidden className="size-4 text-brand" />
        {label}
      </div>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

export function Tenancy() {
  return (
    <Section
      id="multi-tenancy"
      eyebrow="Multi-tenant by design"
      title={
        <>
          One deployment, <span className="text-gradient">many isolated tenants</span>
        </>
      }
      description="Every tenant gets its own issuer, resolved from the host or the path. Put tenants in a shared pool or give one its own silo database, without changing code."
    >
      <div className="card reveal relative overflow-hidden p-5 sm:p-8">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
        <div className="relative grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Request host="acme.id.example.com" />
            <Request host="id.example.com/t/globex" />
            <Request host="initech.id.example.com" />
          </div>
          <div className="flex justify-center text-fg-subtle">
            <ArrowDown aria-hidden className="size-5" />
          </div>
          <div className="mx-auto w-full max-w-md rounded-2xl border-gradient p-4 text-center">
            <p className="text-sm font-semibold">Tenant resolution</p>
            <p className="mt-1 text-xs text-fg-muted">
              UseNamiTenancy() resolves the tenant before routing and refuses unknown or misrouted requests.
              Each tenant answers with its own issuer and discovery document.
            </p>
          </div>
          <div className="flex justify-center text-fg-subtle">
            <ArrowDown aria-hidden className="size-5" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
            <Db label="Pool: shared database">
              <Tenant name="acme" tone="brand" />
              <Tenant name="globex" tone="accent" />
              <div className="mt-1 flex items-center gap-2 rounded-lg bg-ok-bg px-2.5 py-1.5 text-xs text-ok">
                <ShieldCheck aria-hidden className="size-3.5" />
                PostgreSQL row-level security on every tenant table
              </div>
            </Db>
            <Db label="Silo: dedicated database">
              <Tenant name="initech" tone="ok" />
              <p className="text-xs text-fg-muted">Same code path, its own database and keys.</p>
            </Db>
          </div>
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-fg-muted">
        <li className="flex items-center gap-2">
          Pool or silo per tenant <StatusBadge status="available" />
        </li>
        <li className="flex items-center gap-2">
          Per-tenant issuer <StatusBadge status="available" />
        </li>
        <li className="flex items-center gap-2">
          Tenant hierarchy and delegated admin <StatusBadge status="roadmap" />
        </li>
      </ul>
    </Section>
  );
}
