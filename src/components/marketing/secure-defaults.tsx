import { Ban, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { refused } from "@/content/features";

// Values from nami src/Nami.Identity.Core/NamiIdentityOptions.cs and SecurityInvariantGate.cs.
export const defaults = [
  { setting: "Access token lifetime", value: "15 minutes" },
  { setting: "Refresh token absolute cap", value: "8 hours" },
  { setting: "Refresh reuse leeway", value: "30 seconds" },
  { setting: "Session idle timeout", value: "1 hour" },
  { setting: "Session absolute timeout", value: "8 hours" },
  { setting: "PKCE", value: "Required, S256 only" },
  { setting: "Confidential client auth", value: "private_key_jwt" },
  { setting: "Transport", value: "HTTPS required" },
] as const;

export function SecureDefaultsPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
      <div className="card reveal overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-6 py-4">
          <ShieldCheck aria-hidden className="size-4 text-ok" />
          <h3 className="text-sm font-semibold">Defaults you do not have to remember</h3>
        </div>
        <dl className="divide-y divide-border">
          {defaults.map((row) => (
            <div key={row.setting} className="flex items-center justify-between gap-4 px-6 py-3 text-sm">
              <dt className="text-fg-muted">{row.setting}</dt>
              <dd className="text-right font-mono text-xs text-fg">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="card reveal overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-6 py-4">
          <Ban aria-hidden className="size-4 text-bad" />
          <h3 className="text-sm font-semibold">What Nami refuses to ship</h3>
        </div>
        <ul className="divide-y divide-border">
          {refused.map((item) => (
            <li key={item.title} className="px-6 py-3">
              <p className="text-sm font-medium text-fg line-through decoration-bad/70 decoration-2">{item.title}</p>
              <p className="mt-0.5 text-xs text-fg-muted">{item.reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SecureDefaults() {
  return (
    <Section
      id="secure-by-default"
      eyebrow="Secure by default"
      title={
        <>
          The unsafe options <span className="text-gradient">are not options</span>
        </>
      }
      description="Nami refuses to start on an unsafe configuration. The flows that leak tokens are not hidden behind a flag; they are gone."
    >
      <SecureDefaultsPanel />
    </Section>
  );
}
