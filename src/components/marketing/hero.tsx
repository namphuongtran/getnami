import { ArrowRight, ShieldCheck } from "lucide-react";
import { CodeBody, WindowDots } from "@/components/code/code-window";
import { ButtonLink } from "@/components/ui/button";
import { Chip, Container } from "@/components/ui/section";
import { sampleToken, type CodeSample } from "@/content/code-samples";
import { linkTo, primaryCta } from "@/lib/links";
import { site } from "@/lib/site";
import { Waves } from "./waves";

const heroSample: CodeSample = {
  id: "hero",
  file: "Program.cs",
  lang: "csharp",
  caption: "",
  source: "src/Nami.Identity.Host/Program.cs",
  code: `
builder.Services.AddNamiIdentity(_ => { })
    .AddEntityFrameworkStores()
    .UsePostgreSQL()
    .AddMultiTenant()
    .AddKeys()
    .AddClientDefinitions(config.GetSection("Nami:Clients"))
    .AddScopeDefinitions(config.GetSection("Nami:Scopes"));

app.UseNamiTenancy();
`,
};

function JsonLine({ k, v, last }: { k: string; v: string | number; last?: boolean }) {
  return (
    <div className="whitespace-nowrap">
      <span className="text-brand">&quot;{k}&quot;</span>
      <span className="text-fg-subtle">: </span>
      <span className={typeof v === "number" ? "text-accent" : "text-fg"}>
        {typeof v === "number" ? v : `"${v}"`}
      </span>
      {!last && <span className="text-fg-subtle">,</span>}
    </div>
  );
}

function TokenCard() {
  const header = Object.entries(sampleToken.header);
  const payload = Object.entries(sampleToken.payload);
  return (
    <div className="border-gradient w-[min(20rem,82vw)] animate-float rounded-2xl p-4 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">Access token</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-ok-bg px-2 py-0.5 text-[11px] font-medium text-ok">
          <ShieldCheck aria-hidden className="size-3" /> ES256
        </span>
      </div>
      <div className="mt-3 space-y-2 font-mono text-[11.5px] leading-relaxed">
        <div className="rounded-lg bg-bg-subtle p-2.5">
          {header.map(([k, v], i) => (
            <JsonLine key={k} k={k} v={v} last={i === header.length - 1} />
          ))}
        </div>
        <div className="rounded-lg bg-bg-subtle p-2.5">
          {payload.map(([k, v], i) => (
            <JsonLine key={k} k={k} v={v} last={i === payload.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const cta = primaryCta();
  return (
    <section className="relative isolate overflow-hidden pb-36">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="hero-glow absolute inset-x-0 -top-40 h-[760px]" />
        <div className="bg-dots absolute inset-0" />
      </div>
      <Container className="grid grid-cols-1 items-center gap-14 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pt-24">
        <div className="min-w-0">
          <Chip>
            <span className="size-1.5 animate-pulse-dot rounded-full bg-wip" aria-hidden />
            {site.stage} · built in public · Apache-2.0
          </Chip>
          <h1 className="mt-6 text-[clamp(2.4rem,5.4vw,4.1rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
            The <span className="whitespace-nowrap">open-source</span> <span className="text-gradient">identity provider</span> for .NET
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-fg-muted">
            Multi-tenant OAuth 2.0 and OpenID Connect on OpenIddict and PostgreSQL. A free alternative to commercial
            identity servers, for teams that want an identity provider they can run, extend and own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={cta.href} external={cta.external}>
              {cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={linkTo("roadmap")} variant="secondary">
              See the roadmap
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-subtle" aria-label="Stack">
            <li>.NET 10</li>
            <li>OpenIddict 7</li>
            <li>PostgreSQL 18</li>
            <li>EF Core 10</li>
            <li>Apache-2.0</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl min-w-0 lg:mr-0">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand/20 via-transparent to-accent/20 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-border-strong bg-code-bg/90 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <WindowDots />
              <span className="font-mono text-xs text-fg-subtle">Program.cs</span>
            </div>
            <CodeBody sample={heroSample} className="pb-40 sm:pb-32" />
          </div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 sm:-right-4 sm:left-auto sm:translate-x-0 lg:-right-10">
            <TokenCard />
          </div>
        </div>
      </Container>
      <Waves />
    </section>
  );
}
