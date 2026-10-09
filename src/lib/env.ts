// Build-time configuration. Every value is a NEXT_PUBLIC_* variable, inlined at `next build`,
// so changing one means rebuilding. See .env.example for what each one does.

const DEFAULT_SITE_URL = "https://getnami.dev";

function flag(value: string | undefined): boolean {
  return value === "true" || value === "1";
}

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function siteUrl(): string {
  const raw = optional(process.env.NEXT_PUBLIC_SITE_URL);
  if (!raw && process.env.CI) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set in CI so canonical URLs point at production.");
  }
  return (raw ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export const env = {
  siteUrl: siteUrl(),
  allowIndexing: flag(process.env.NEXT_PUBLIC_ALLOW_INDEXING),
  repoPublic: flag(process.env.NEXT_PUBLIC_REPO_PUBLIC),
  repoUrl: optional(process.env.NEXT_PUBLIC_REPO_URL) ?? "https://github.com/namphuongtran/nami",
  contactEmail: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "me@getnami.dev",
  contactFormAction: optional(process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION),
  newsletterFormAction: optional(process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION),
  gscVerification: optional(process.env.NEXT_PUBLIC_GSC_VERIFICATION),
  cfBeaconToken: optional(process.env.NEXT_PUBLIC_CF_BEACON_TOKEN),
  gaId: optional(process.env.NEXT_PUBLIC_GA_ID),
} as const;

