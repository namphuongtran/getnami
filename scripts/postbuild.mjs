// Writes out/_headers for Cloudflare Pages after `next build`.
// Generated rather than hand-written because the Content-Security-Policy depends on which
// env-gated integrations (analytics, form providers) are enabled for this build.
import { existsSync, writeFileSync } from "node:fs";

const env = process.env;
const on = (name) => Boolean(env[name]?.trim());
const origin = (url) => new URL(url).origin;

if (!existsSync("out")) {
  console.error("postbuild: out/ does not exist. Run `next build` first.");
  process.exit(1);
}

const script = ["'self'", "'unsafe-inline'"]; // App Router inlines per-page RSC payload scripts.
const connect = ["'self'"];
const img = ["'self'", "data:"];
const form = ["'self'"];

if (on("NEXT_PUBLIC_CF_BEACON_TOKEN")) {
  script.push("https://static.cloudflareinsights.com");
  connect.push("https://cloudflareinsights.com");
}
if (on("NEXT_PUBLIC_GA_ID")) {
  script.push("https://www.googletagmanager.com");
  connect.push("https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com");
  img.push("https://*.google-analytics.com", "https://www.googletagmanager.com");
}
for (const name of ["NEXT_PUBLIC_CONTACT_FORM_ACTION", "NEXT_PUBLIC_NEWSLETTER_FORM_ACTION"]) {
  if (on(name)) form.push(origin(env[name]));
}

const csp = [
  "default-src 'self'",
  `script-src ${script.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src ${img.join(" ")}`,
  "font-src 'self'",
  `connect-src ${connect.join(" ")}`,
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  `form-action ${form.join(" ")}`,
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const indexing = env.NEXT_PUBLIC_ALLOW_INDEXING === "true" || env.NEXT_PUBLIC_ALLOW_INDEXING === "1";

const headers = `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: ${csp}${indexing ? "" : "\n  X-Robots-Tag: noindex, nofollow"}

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=86400
`;

// Cloudflare Pages limits: 100 rules, 2,000 characters per line.
const longest = Math.max(...headers.split("\n").map((line) => line.length));
if (longest > 2000) {
  console.error(`postbuild: a _headers line is ${longest} characters; Pages allows 2,000.`);
  process.exit(1);
}

writeFileSync("out/_headers", headers);
console.log(`postbuild: wrote out/_headers (indexing ${indexing ? "on" : "off"})`);
