import { site } from "./site";

export interface PageInfo {
  /** Route path with a trailing slash, matching `trailingSlash: true`. */
  path: string;
  /** Used for the OG image file name: /og/<slug>.png */
  slug: string;
  /** Short name for navigation and breadcrumbs. */
  name: string;
  /** <title> without the site suffix. */
  title: string;
  description: string;
  /** Eyebrow text on the OG card. */
  eyebrow: string;
  /** ISO date the page content last changed, for the sitemap. */
  updated: string;
  priority: number;
}

export const pages = {
  home: {
    path: "/",
    slug: "home",
    name: "Home",
    title: "Nami: the open-source identity provider for .NET",
    description: site.description,
    eyebrow: "Open-source identity for .NET",
    updated: "2026-10-09",
    priority: 1,
  },
  features: {
    path: "/features/",
    slug: "features",
    name: "Features",
    title: "Features: OAuth 2.0, OpenID Connect, multi-tenancy",
    description:
      "Every Nami capability with its real status: OAuth 2.0 and OpenID Connect flows, multi-tenancy, keys, MFA and passkeys, admin, audit and privacy.",
    eyebrow: "Feature catalogue",
    updated: "2026-10-09",
    priority: 0.9,
  },
  dotnet: {
    path: "/dotnet/",
    slug: "dotnet",
    name: "For .NET",
    title: "Built for .NET: ASP.NET Core, EF Core, NuGet",
    description:
      "Nami composes like any ASP.NET Core service: a fluent builder, EF Core and PostgreSQL, ASP.NET Core Identity, Data Protection and plain JwtBearer APIs.",
    eyebrow: "Built for .NET teams",
    updated: "2026-10-09",
    priority: 0.9,
  },
  security: {
    path: "/security/",
    slug: "security",
    name: "Security",
    title: "Security: secure defaults and a tamper-evident audit",
    description:
      "Nami ships secure by default: PKCE required, no implicit or password grants, a startup security gate, hash-chained audit logs and OWASP ASVS targets.",
    eyebrow: "Secure by default",
    updated: "2026-10-09",
    priority: 0.8,
  },
  roadmap: {
    path: "/roadmap/",
    slug: "roadmap",
    name: "Roadmap",
    title: "Roadmap: from core protocol to OpenID certification",
    description:
      "Where Nami stands today and what ships next: five milestones from the core token server through MFA, key rotation, admin and certification.",
    eyebrow: "Built in public",
    updated: "2026-10-09",
    priority: 0.8,
  },
  compare: {
    path: "/compare/",
    slug: "compare",
    name: "Compare",
    title: "Compare Nami with hosted and commercial identity",
    description:
      "How an open-source, self-hosted .NET identity provider compares with commercial identity servers, hosted identity services and building your own.",
    eyebrow: "How Nami compares",
    updated: "2026-10-09",
    priority: 0.7,
  },
  pricing: {
    path: "/pricing/",
    slug: "pricing",
    name: "Pricing",
    title: "Pricing: free forever core, enterprise partnership",
    description:
      "The Nami core is free forever under Apache-2.0 with no license keys. Enterprises can talk to us about design partnership, reviews and migration help.",
    eyebrow: "Free forever core",
    updated: "2026-10-09",
    priority: 0.8,
  },
  faq: {
    path: "/faq/",
    slug: "faq",
    name: "FAQ",
    title: "FAQ: licensing, status, OpenIddict and migration",
    description:
      "Answers about Nami: its license, project status, how it relates to OpenIddict, supported databases, multi-tenancy and moving from other identity servers.",
    eyebrow: "Questions and answers",
    updated: "2026-10-09",
    priority: 0.6,
  },
  blog: {
    path: "/blog/",
    slug: "blog",
    name: "Blog",
    title: "Blog: building an identity provider for .NET",
    description:
      "Notes from building Nami in public: identity protocol design, multi-tenancy, key management and the decisions behind an open-source .NET identity provider.",
    eyebrow: "From the build",
    updated: "2026-10-09",
    priority: 0.6,
  },
  contact: {
    path: "/contact/",
    slug: "contact",
    name: "Contact",
    title: "Contact: early access and enterprise partnership",
    description:
      "Talk to the Nami team about early access, design partnership, architecture reviews or migrating from a commercial identity server to open source.",
    eyebrow: "Talk to us",
    updated: "2026-10-09",
    priority: 0.5,
  },
  privacy: {
    path: "/legal/privacy/",
    slug: "privacy",
    name: "Privacy",
    title: "Privacy policy for the getnami.dev website",
    description:
      "How the getnami.dev website handles data: what analytics and form providers are used, what they receive, and how to reach us about your data.",
    eyebrow: "Privacy",
    updated: "2026-10-09",
    priority: 0.2,
  },
} as const satisfies Record<string, PageInfo>;

export type PageKey = keyof typeof pages;

/** Pages listed in the sitemap and given OG images. */
export function publicPages(): PageInfo[] {
  return Object.values(pages);
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).toString();
}
