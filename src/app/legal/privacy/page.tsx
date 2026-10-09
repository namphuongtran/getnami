import { PageHeader } from "@/components/marketing/page-header";
import { Container } from "@/components/ui/section";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";
import { formatDate, mailto, site } from "@/lib/site";

export const metadata = buildMetadata(pages.privacy);

export default function PrivacyPage() {
  const processors = [
    { enabled: true, name: "Cloudflare Pages", purpose: "Hosts this website and serves its pages. Standard request logs are processed by Cloudflare." },
    { enabled: Boolean(env.cfBeaconToken), name: "Cloudflare Web Analytics", purpose: "Counts page views without cookies and without tracking you across sites." },
    { enabled: Boolean(env.gaId), name: "Google Analytics", purpose: "Measures how pages are used, only after you allow it in the consent banner." },
    { enabled: Boolean(env.contactFormAction), name: "Contact form provider", purpose: "Receives the details you submit in the contact form so we can reply." },
    { enabled: Boolean(env.newsletterFormAction), name: "Newsletter provider", purpose: "Stores your email address to send release updates. Every email has an unsubscribe link." },
  ].filter((p) => p.enabled);

  return (
    <>
      <PageHeader
        page={pages.privacy}
        trail={[pages.privacy]}
        title="Privacy policy"
        lead={`How ${site.domain} handles your data. Last updated ${formatDate(pages.privacy.updated)}.`}
      />
      <Container className="py-16">
        <div className="prose-nami max-w-3xl">
          <h2>What this site collects</h2>
          <p>
            This is a static marketing website for the Nami open-source project. It has no accounts and sets no
            cookies of its own. Your theme choice is stored in your browser&apos;s local storage and never leaves your
            device.
          </p>
          <h2>Services that process data</h2>
          <ul>
            {processors.map((p) => (
              <li key={p.name}>
                <strong>{p.name}.</strong> {p.purpose}
              </li>
            ))}
          </ul>
          <h2>Email</h2>
          <p>
            If you email us, we use your message and address only to reply and to follow up on what you asked about.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask what we hold about you, and ask us to correct or delete it, by emailing{" "}
            <a href={mailto("Privacy request")}>{site.contactEmail}</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
