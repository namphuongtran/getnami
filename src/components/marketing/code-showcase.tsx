import { CodeBody } from "@/components/code/code-window";
import { CodeTabs } from "@/components/code/code-tabs";
import { Section } from "@/components/ui/section";
import { appsettingsJson, programCs, resourceApi, type CodeSample } from "@/content/code-samples";

const samples: CodeSample[] = [programCs, appsettingsJson, resourceApi];

const points = [
  {
    title: "A library, not a black box",
    body: "Nami composes into your own ASP.NET Core host. Read it, debug it, step into it.",
  },
  {
    title: "Configuration you can review",
    body: "Clients and scopes live in appsettings.json with secure defaults, and are seeded at startup.",
  },
  {
    title: "Standard on the wire",
    body: "Your APIs validate tokens with the JwtBearer handler from Microsoft. No proprietary SDK.",
  },
];

export async function CodeShowcase() {
  const tabs = await Promise.all(
    samples.map(async (sample) => ({
      id: sample.id,
      label: sample.file,
      caption: sample.caption,
      source: sample.source,
      code: sample.code.trim(),
      body: <CodeBody sample={sample} />,
    })),
  );

  return (
    <Section
      id="code"
      eyebrow="Developer experience"
      title="Feels like ASP.NET Core, because it is"
      description="No new runtime and no new mental model. Nami is a set of packages and a reference host on the stack you already ship."
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
        <ol className="space-y-8">
          {points.map((point, index) => (
            <li key={point.title} className="reveal flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-xs text-brand">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{point.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="reveal min-w-0">
          <CodeTabs tabs={tabs} />
        </div>
      </div>
    </Section>
  );
}
