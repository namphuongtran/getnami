import { Boxes, Layers, Package, Plug } from "lucide-react";
import { CodeWindow } from "@/components/code/code-window";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHeader } from "@/components/marketing/page-header";
import { IconTile } from "@/components/marketing/pillars";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { extensionPoints, plannedBuilder, programCs, resourceApi } from "@/content/code-samples";
import { ecosystem, packageGroups } from "@/content/packages";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";

export const metadata = buildMetadata(pages.dotnet);

const reasons = [
  {
    icon: Layers,
    title: "Your host, your pipeline",
    body: "Nami is packages you add to an ASP.NET Core app, with a reference host when you just want to run it.",
  },
  {
    icon: Plug,
    title: "Ports and adapters",
    body: "Audit, events, claims, keys and secrets are interfaces. Swap any of them without forking.",
  },
  {
    icon: Package,
    title: "Familiar building blocks",
    body: "EF Core migrations, ASP.NET Core Identity, Data Protection and options validation, used the way Microsoft documents them.",
  },
  {
    icon: Boxes,
    title: "No proprietary client SDK",
    body: "Relying parties and APIs use the standard OpenID Connect and JwtBearer handlers from Microsoft.",
  },
];

export default function DotnetPage() {
  return (
    <>
      <PageHeader
        page={pages.dotnet}
        title={
          <>
            Identity that composes <span className="text-gradient">like the rest of your .NET code</span>
          </>
        }
        lead="Nami is a set of NuGet packages and a reference host for ASP.NET Core 10. Add it to Program.cs, configure it in appsettings.json, protect APIs with JwtBearer."
      />

      <Section align="left" eyebrow="Why .NET teams pick it" title="Made of parts you already know">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="card reveal p-6">
              <IconTile icon={reason.icon} />
              <h3 className="mt-4 font-semibold tracking-tight">{reason.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{reason.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        align="left"
        eyebrow="Server"
        title="One builder, opt-in parts"
        description="The builder below runs today in the reference host. Each call adds one capability."
        className="pt-0 sm:pt-0"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CodeWindow sample={programCs} showSource className="reveal" />
          <div className="space-y-6">
            <CodeWindow sample={extensionPoints} showSource className="reveal" />
            <CodeWindow sample={plannedBuilder} showSource className="reveal" />
          </div>
        </div>
      </Section>

      <Section
        align="left"
        eyebrow="APIs"
        title="Resource servers stay boring"
        description="Access tokens are standard at+jwt tokens, or reference tokens you introspect. Validate them with the middleware you already use."
        className="pt-0 sm:pt-0"
      >
        <CodeWindow sample={resourceApi} showSource className="reveal max-w-3xl" />
      </Section>

      <Section
        align="left"
        eyebrow="Packages"
        title="The package map"
        description="Projects marked available exist and are packable in the repository. Nothing is published to NuGet yet; packages ship with the release pipeline."
        className="pt-0 sm:pt-0"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {packageGroups.map((group) => (
            <div key={group.title} className="card reveal overflow-hidden">
              <h3 className="border-b border-border px-5 py-3 text-sm font-semibold">{group.title}</h3>
              <ul className="divide-y divide-border">
                {group.packages.map((pkg) => (
                  <li key={pkg.name} className="flex items-start justify-between gap-4 px-5 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-mono text-xs text-fg">{pkg.name}</p>
                      <p className="mt-0.5 text-xs text-fg-muted">{pkg.purpose}</p>
                    </div>
                    <StatusBadge status={pkg.status} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section align="left" eyebrow="Ecosystem" title="Standing on the .NET ecosystem" className="pt-0 sm:pt-0">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ecosystem.map((item) => (
            <li key={item.name} className="card reveal p-4">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="mt-1 text-xs text-fg-muted">{item.role}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
