// SEO and integrity checks over the static export in out/.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://getnami.dev").replace(/\/+$/, "");
const out = "out";
const failures = [];
const fail = (file, message) => failures.push(`${file}: ${message}`);

for (const required of ["index.html", "404.html", "robots.txt", "sitemap.xml", "_headers", "manifest.webmanifest", "icon.svg", "favicon.ico"]) {
  if (!existsSync(join(out, required))) fail(required, "missing from out/");
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (entry === "_next") continue;
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (entry === "index.html") yield path;
  }
}

/** Maps a site URL path to the file that serves it. */
function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  if (clean.endsWith("/")) return join(out, clean, "index.html");
  return join(out, clean);
}

const attr = (html, regex) => html.match(regex)?.[1];
let pagesChecked = 0;

for (const file of htmlFiles(out)) {
  const rel = relative(out, file);
  const path = `/${rel.replace(/index\.html$/, "")}`;
  // Next writes internal not-found routes as pages too; they are not part of the site.
  if (path.startsWith("/_not-found") || path.startsWith("/404")) continue;

  pagesChecked++;
  const html = readFileSync(file, "utf8");
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");

  const h1s = visible.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(rel, `expected exactly one <h1>, found ${h1s}`);

  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) fail(rel, "missing <title>");
  else if (title.length < 30 || title.length > 70) fail(rel, `title is ${title.length} chars (30-70): "${title}"`);

  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!description) fail(rel, "missing meta description");
  else if (description.length < 70 || description.length > 170)
    fail(rel, `description is ${description.length} chars (70-170)`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (canonical !== `${siteUrl}${path}`) fail(rel, `canonical is "${canonical}", expected "${siteUrl}${path}"`);

  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (!ogImage) fail(rel, "missing og:image");
  else if (!existsSync(fileFor(ogImage.replace(siteUrl, "")))) fail(rel, `og:image ${ogImage} has no file in out/`);

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail(rel, "JSON-LD does not parse");
    }
  }

  for (const word of ["localhost", "undefined", "NaN", "lorem ipsum", "[object Object]"]) {
    if (visible.includes(word)) fail(rel, `visible HTML contains "${word}"`);
  }

  for (const [, href] of visible.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith("/_next/")) continue;
    if (!existsSync(fileFor(href))) fail(rel, `internal link ${href} has no file in out/`);
    else if (!href.split("#")[0].endsWith("/") && !/\.[a-z0-9]+$/i.test(href.split("#")[0]))
      fail(rel, `internal link ${href} lacks a trailing slash`);
  }
}

if (existsSync(join(out, "sitemap.xml"))) {
  const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
  for (const [, loc] of sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)) {
    if (!loc.startsWith(`${siteUrl}/`)) fail("sitemap.xml", `${loc} is not under ${siteUrl}`);
    else if (!existsSync(fileFor(loc.slice(siteUrl.length)))) fail("sitemap.xml", `${loc} has no file in out/`);
  }
}

if (failures.length > 0) {
  console.error(`check:output found ${failures.length} problem(s):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`check:output passed (${pagesChecked} pages)`);
