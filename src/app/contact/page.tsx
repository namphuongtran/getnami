import { Building2, Mail, Rocket, Shield } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { IconTile } from "@/components/marketing/pillars";
import { Section } from "@/components/ui/section";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";
import { mailto, site } from "@/lib/site";

export const metadata = buildMetadata(pages.contact);

const reasons = [
  {
    icon: Rocket,
    title: "Early access",
    body: "Try Nami before it is public and tell us what your team needs first.",
    subject: "Nami early access",
  },
  {
    icon: Building2,
    title: "Enterprise partnership",
    body: "Design partnership, architecture reviews and support as the project matures.",
    subject: "Nami Enterprise",
  },
  {
    icon: Shield,
    title: "Migration planning",
    body: "Moving from a commercial identity server? We can map your clients, scopes and users.",
    subject: "Nami migration",
  },
];

const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-brand";

function ContactForm({ action }: { action: string }) {
  return (
    <form action={action} method="post" className="card space-y-4 p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium">
          Work email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Company
        <input name="company" autoComplete="organization" className={fieldClass} />
      </label>
      <label className="block text-sm font-medium">
        Topic
        <select name="topic" className={fieldClass} defaultValue="Early access">
          {reasons.map((reason) => (
            <option key={reason.title}>{reason.title}</option>
          ))}
          <option>Something else</option>
        </select>
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea name="message" rows={5} required className={fieldClass} />
      </label>
      {/* Honeypot: real people never see or fill this field. */}
      <div aria-hidden className="hidden">
        <label>
          Leave this empty
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className="min-h-11 w-full rounded-full bg-fg px-5 text-sm font-medium text-bg sm:w-auto">
        Send message
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        page={pages.contact}
        title={
          <>
            Talk to the people <span className="text-gradient">building Nami</span>
          </>
        }
        lead="Early access, enterprise partnership or migration questions. Every message is read by a maintainer."
      />
      <Section align="left">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {reasons.map((reason) => (
              <a
                key={reason.title}
                href={mailto(reason.subject)}
                className="card group flex gap-4 p-5 transition-colors hover:border-border-strong"
              >
                <IconTile icon={reason.icon} />
                <div>
                  <h2 className="font-semibold tracking-tight group-hover:text-brand">{reason.title}</h2>
                  <p className="mt-1 text-sm text-fg-muted">{reason.body}</p>
                </div>
              </a>
            ))}
          </div>
          {env.contactFormAction ? (
            <ContactForm action={env.contactFormAction} />
          ) : (
            <div className="border-gradient flex flex-col items-start justify-center rounded-2xl p-8">
              <Mail aria-hidden className="size-8 text-brand" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">Email us directly</h2>
              <p className="mt-2 text-fg-muted">
                Tell us about your team, your stack and what you need from an identity provider.
              </p>
              <a
                href={mailto("Nami Enterprise")}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg"
              >
                {site.contactEmail}
              </a>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
