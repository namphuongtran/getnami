<div align="center">

<img src="src/app/icon.svg" width="72" height="72" alt="Nami logo" />

# Nami

**The open-source identity provider for .NET**

Multi-tenant OAuth 2.0 and OpenID Connect on OpenIddict and PostgreSQL.
Apache-2.0. No license keys, no production gates, no paid tiers on the core. Ever.

[getnami.dev](https://getnami.dev) · [Features](https://getnami.dev/features/) · [Roadmap](https://getnami.dev/roadmap/) · [Talk to us](https://getnami.dev/contact/)

`#identity-provider` `#oauth2` `#openid-connect` `#dotnet` `#aspnetcore` `#openiddict` `#sso` `#multi-tenant` `#passkeys` `#postgresql`

</div>

---

## What is Nami?

Nami is an OAuth 2.0 and OpenID Connect authorization server for .NET 10: a free, Apache-2.0 alternative to commercial identity servers, for teams that want an identity provider they can run, extend and own. It is built on the [OpenIddict](https://documentation.openiddict.com/) protocol engine and adds the product layer teams otherwise build by hand.

| | |
|---|---|
| **Free and open** | Apache-2.0. No license keys, no production gates, no paid tiers on the core. |
| **Built on OpenIddict** | A mature open-source protocol engine. Nami never re-implements what it does. |
| **Multi-tenant by design** | Per-tenant issuers, pool or silo databases, PostgreSQL row-level security as a backstop. |
| **Keys that manage themselves** | First key minted at startup, wrapped with Data Protection, rotation without restarts. |
| **Secure by default** | PKCE required (S256 only), no implicit or password grant, a startup gate that refuses unsafe config. |
| **Verifiable** | Hash-chained, tamper-evident audit log. |

```csharp
builder.Services.AddNamiIdentity(_ => { })
    .AddEntityFrameworkStores()
    .UsePostgreSQL()
    .AddMultiTenant()
    .AddKeys()
    .AddClientDefinitions(builder.Configuration.GetSection("Nami:Clients"))
    .AddScopeDefinitions(builder.Configuration.GetSection("Nami:Scopes"));
```

### Status

Nami is **pre-alpha and built in public**. Milestone M1 (the core token server) is built and covered by 1,022 automated tests. M2 (users, MFA, passkeys, login UI, quickstart) is in progress. The site labels every feature as **Available**, **In progress** or **Roadmap**, checked against the source; see [the roadmap](https://getnami.dev/roadmap/).

---

## About this repository

This repository is **getnami.dev**, the product website for Nami. The identity provider itself lives in a separate repository.

### Stack

- [Next.js 16](https://nextjs.org) App Router, **static export** (`output: "export"`) to `out/`
- React 19, TypeScript 5.9, Tailwind CSS 4
- Shiki for build-time code highlighting (no highlighting JavaScript ships)
- MDX for blog posts
- Hosted on **Cloudflare Pages**

### SEO built in

- Per-page titles, descriptions and canonical URLs (`src/lib/metadata.ts`)
- Generated `sitemap.xml`, `robots.txt` and web manifest
- Open Graph images rendered at build time for every page (`src/app/og/[file]/route.tsx`)
- JSON-LD: Organization, WebSite, SoftwareApplication, FAQPage, BlogPosting, BreadcrumbList
- Google Search Console verification, Cloudflare Web Analytics and GA4 (with consent) behind env vars
- Lighthouse (mobile): performance 98, accessibility 100, best practices 100, SEO 100

### Develop

Requires Node 24 and pnpm 12.

```bash
pnpm install
cp .env.example .env.local   # optional
pnpm dev                     # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Static export to `out/`, then writes `out/_headers` (security headers, CSP) |
| `pnpm preview` | Serves `out/` with Cloudflare Pages emulation (headers and redirects) on :8788 |
| `pnpm check` | Everything CI runs: lint, typecheck, content, build, copy and output checks |

### Configuration

All settings are `NEXT_PUBLIC_*` build-time variables; see [`.env.example`](.env.example).

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://getnami.dev` | Canonical origin (required in CI) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | Turn on search indexing at launch |
| `NEXT_PUBLIC_REPO_PUBLIC` | `false` | Show GitHub calls to action once the Nami repository is public |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `me@getnami.dev` | Contact and enterprise mailto |
| `NEXT_PUBLIC_CONTACT_FORM_ACTION` | | Optional form endpoint (Formspree or similar) |
| `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` | | Optional newsletter signup endpoint |
| `NEXT_PUBLIC_GSC_VERIFICATION` | | Google Search Console meta tag token |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | | Cloudflare Web Analytics (cookieless) |
| `NEXT_PUBLIC_GA_ID` | | Google Analytics 4, loaded with Consent Mode |

### Updating content

| To change | Edit |
|---|---|
| A feature or its status | `src/content/features.ts` (the only place statuses live) |
| Milestones and phases | `src/content/milestones.ts` |
| Code samples | `src/content/code-samples.ts` |
| FAQ, pricing, comparison | `src/content/faq.ts`, `pricing.ts`, `comparison.ts` |
| A blog post | Add `src/content/blog/<slug>.mdx` and register it in `src/content/blog/posts.ts` |

After re-checking statuses against the Nami repository, update `statusAsOf` and `sourceCommit` in `src/lib/site.ts`. `pnpm check:content` verifies that every **Available** feature cites a file that exists in the Nami repository (when it sits next to this one).

### Copy rules

`pnpm check:copy` enforces these on source and built pages:

- Refer to competitors only as "commercial identity servers"; never name a specific product or vendor.
- No em dashes.
- Say "built to support GDPR", never claim compliance or certifications Nami does not hold.
- No claims of production readiness while Nami is pre-alpha.

### Deploy to Cloudflare Pages

CI (`.github/workflows/ci.yml`) builds, checks and deploys with Direct Upload:

1. Create the project once: `pnpm exec wrangler pages project create getnami --production-branch=main`
2. Add repository secrets `CLOUDFLARE_API_TOKEN` (Pages: Edit) and `CLOUDFLARE_ACCOUNT_ID`.
3. Add repository variables for any `NEXT_PUBLIC_*` values you want to override.
4. Push to `main` to deploy production; pull requests get preview deployments.
5. In Cloudflare, attach `getnami.dev`, verify it in Google Search Console with a DNS TXT record, and turn off Rocket Loader and Email Obfuscation for the zone (they inject scripts the CSP blocks).

Until the secrets exist, the deploy job skips itself and CI stays green.

**Launch checklist:** make the Nami repository public, set `NEXT_PUBLIC_REPO_PUBLIC=true` and `NEXT_PUBLIC_ALLOW_INDEXING=true`, redeploy, then submit `https://getnami.dev/sitemap.xml` in Search Console.

## License

[Apache-2.0](LICENSE). Copyright 2026 Nam Phuong Tran and Nami contributors.
