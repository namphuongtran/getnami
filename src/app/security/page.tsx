import { FileLock2, Fingerprint, Link2, ScrollText, ShieldAlert, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageHeader } from "@/components/marketing/page-header";
import { IconTile } from "@/components/marketing/pillars";
import { SecureDefaultsPanel } from "@/components/marketing/secure-defaults";
import { Section } from "@/components/ui/section";
import { features } from "@/content/features";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";
import { mailto, site } from "@/lib/site";

export const metadata = buildMetadata(pages.security);

const practices = [
  {
    icon: ShieldCheck,
    title: "A startup gate, not a checklist",
    body: "Security invariants are asserted when the host starts. Turn PKCE off, enable the implicit flow, load a symmetric signing key or pick a weak encryption algorithm, and Nami does not start.",
  },
  {
    icon: Link2,
    title: "Hash-chained audit",
    body: "Each audit record carries the hash of the one before it. Edit or delete a record and verification shows exactly where the chain breaks.",
  },
  {
    icon: FileLock2,
    title: "Keys wrapped at rest",
    body: "Signing and encryption keys are stored encrypted by ASP.NET Core Data Protection, whose keyring is protected by an X.509 certificate.",
  },
  {
    icon: Fingerprint,
    title: "Isolation twice over",
    body: "Tenant isolation is enforced by the application and again by PostgreSQL row-level security, and tested under a database role that cannot bypass it.",
  },
  {
    icon: ScrollText,
    title: "Standards as the floor",
    body: "OWASP ASVS 5.0 Level 2 is the floor, Level 3 for keys, tokens, admin and tenant isolation, and assurance levels map to NIST SP 800-63B. These are self-assessed targets, not certifications.",
  },
  {
    icon: ShieldAlert,
    title: "Supply chain in CI",
    body: "Every change runs dependency vulnerability scanning and secret scanning. Signed releases with provenance and an SBOM are on the roadmap.",
  },
];

export default function SecurityPage() {
  const securityFeatures = features.filter((f) => f.category === "security" && f.horizon === "v1");
  return (
    <>
      <PageHeader
        page={pages.security}
        title={
          <>
            Secure by default, <span className="text-gradient">verifiable by design</span>
          </>
        }
        lead="An identity provider is the front door to everything else you run. Nami removes the dangerous options, refuses unsafe configuration and keeps evidence you can check."
      />

      <Section align="left" eyebrow="Defaults" title="Safe out of the box">
        <SecureDefaultsPanel />
      </Section>

      <Section align="left" eyebrow="Practices" title="How Nami earns trust" className="pt-0 sm:pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map((practice) => (
            <div key={practice.title} className="card reveal p-6">
              <IconTile icon={practice.icon} />
              <h3 className="mt-4 font-semibold tracking-tight">{practice.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{practice.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section align="left" eyebrow="Status" title="Security features" className="pt-0 sm:pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((feature) => (
            <div key={feature.id} className="reveal">
              <FeatureCard feature={feature} showEvidence />
            </div>
          ))}
        </div>
      </Section>

      <Section align="left" eyebrow="Disclosure" title="Report a vulnerability" className="pt-0 sm:pt-0">
        <div className="card max-w-3xl p-6 text-sm text-fg-muted">
          <p>
            Please report security issues privately and never in a public issue. Email{" "}
            <a href={mailto("Security report")} className="text-brand underline underline-offset-4">
              {site.contactEmail}
            </a>
            {site.repoPublic && (
              <>
                {" "}or open a{" "}
                <a
                  href={`${site.repoUrl}/security/advisories/new`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline underline-offset-4"
                >
                  private security advisory
                </a>
              </>
            )}
            . We acknowledge reports within 72 hours and coordinate disclosure within 90 days.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
