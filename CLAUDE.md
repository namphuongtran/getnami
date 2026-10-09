# getnami.dev

Marketing site for Nami, the open-source identity provider for .NET. The product lives in a separate
repository (`../nami` locally). This repo is a Next.js 16 static export hosted on Cloudflare Pages.

@AGENTS.md

## Rules for site copy

These mirror the Nami repository's own rules and are enforced by `pnpm check:copy`.

- Never name the direct commercial competitor, its vendor, or a real client organization. Write
  "commercial identity servers". The comparison table uses generic categories only.
- No em dash in prose.
- "Built to support GDPR", never "compliant". No SOC 2, HIPAA, ISO 27001, FedRAMP or PCI claims.
  No "OpenID Certified" until it is true.
- Nami is pre-alpha: never claim it is ready for production in the present tense.
- No fake logos, testimonials, ratings, adopters or download counts. `src/content/proof.ts` stays
  empty until there is something real, with permission.
- Every number on the site carries its source and date (`src/content/stats.ts`).

## Feature statuses

- Statuses live only in `src/content/features.ts`. Components never hardcode a status.
- `available` requires `evidence`: a path in the Nami repository. `pnpm check:content` checks it
  exists when `../nami` is present.
- When re-checking against Nami's `docs/BUILD-PLAN.md`, update `statusAsOf` and `sourceCommit` in
  `src/lib/site.ts`.

## Static export constraints

- Route handlers and metadata routes need `export const dynamic = "force-static"`.
- Dynamic segments need `generateStaticParams` and `dynamicParams = false`.
- No rewrites, redirects or headers in `next.config.ts`: use `public/_redirects`, and
  `scripts/postbuild.mjs` writes `out/_headers` (the CSP grows with enabled integrations).
- OG images are `.png` route handlers under `src/app/og/[file]`, not `opengraph-image.tsx`, because
  the export would write that convention without a file extension.
- Internal links use `<Link>` with `linkTo()` from `src/lib/links.ts`; `trailingSlash` is on and
  canonicals end in `/`.

## Verify before committing

`pnpm check` runs lint, typecheck, content checks, the build, and the copy and output checks.
`pnpm preview` serves `out/` with Cloudflare's header and redirect handling on port 8788.
