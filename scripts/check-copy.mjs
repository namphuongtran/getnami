// Fails the build when site copy breaks the project's copy rules (see CLAUDE.md).
// Scans source, public files and the built HTML/XML/TXT. Library JS under out/_next is skipped.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const rules = [
  { name: "names the commercial competitor", pattern: /\bduende\b/i },
  { name: "names the commercial competitor's product", pattern: /identityserver/i },
  { name: "names the commercial competitor's product", pattern: /\bIdentity Server\b/ },
  { name: "em dash", pattern: /—|&mdash;|&#8212;/ },
  { name: "claims GDPR compliance (say 'built to support GDPR')", pattern: /GDPR[- ]compliant|compliant with (the )?GDPR/i },
  { name: "claims a certification Nami does not hold", pattern: /\b(SOC ?2|HIPAA|ISO\/?(IEC )?27001|FedRAMP|PCI[- ]DSS)\b/i },
  { name: "claims OpenID certification", pattern: /OpenID Certified/i },
  { name: "claims production readiness (add copy-allow on the line if negated)", pattern: /production[- ]ready/i, allowMarker: true },
];

const roots = ["src", "public", "out", "README.md"];
const textExtensions = new Set([".ts", ".tsx", ".mdx", ".md", ".css", ".json", ".html", ".xml", ".txt", ".svg", ""]);

function* walk(path) {
  const stat = statSync(path, { throwIfNoEntry: false });
  if (!stat) return;
  if (stat.isFile()) {
    yield path;
    return;
  }
  for (const entry of readdirSync(path)) {
    if (entry === "_next" || entry === "node_modules") continue;
    yield* walk(join(path, entry));
  }
}

const failures = [];
for (const root of roots) {
  for (const file of walk(root)) {
    if (!textExtensions.has(extname(file))) continue;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const rule of rules) {
        if (rule.allowMarker && line.includes("copy-allow")) continue;
        const match = line.match(rule.pattern);
        if (match) failures.push(`${file}:${index + 1}: ${rule.name}: "${match[0]}"`);
      }
    });
  }
}

if (failures.length > 0) {
  console.error(`check:copy found ${failures.length} problem(s):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log("check:copy passed");
