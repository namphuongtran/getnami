import { env } from "./env";

export const site = {
  name: "Nami",
  domain: "getnami.dev",
  url: env.siteUrl,
  tagline: "The open-source identity provider for .NET",
  description:
    "Nami is an open-source, multi-tenant OAuth 2.0 and OpenID Connect identity provider for .NET, built on OpenIddict and PostgreSQL. Apache-2.0, no license keys.",
  pitch:
    "A free, Apache-2.0 licensed alternative to commercial identity servers, designed for teams that want an identity provider they can run, extend, and own.",
  license: "Apache-2.0",
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0",
  author: "Nam Phuong Tran",
  repoUrl: env.repoUrl,
  repoPublic: env.repoPublic,
  contactEmail: env.contactEmail,
  /** The date the feature statuses were last checked against the nami repository. */
  statusAsOf: "2026-10-09",
  /** The nami commit the statuses were checked against. */
  sourceCommit: "c473f0e",
  stage: "Pre-alpha",
} as const;

export function mailto(subject: string): string {
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
