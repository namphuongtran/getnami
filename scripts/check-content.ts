// Invariants over the content data, so a status change can never make the site dishonest.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { features } from "../src/content/features";
import { milestones } from "../src/content/milestones";
import { pillars } from "../src/content/pillars";
import type { Feature } from "../src/content/types";
import { site } from "../src/lib/site";

const errors: string[] = [];
const warnings: string[] = [];
const all: readonly Feature[] = features;

const seen = new Set<string>();
for (const feature of all) {
  if (seen.has(feature.id)) errors.push(`duplicate feature id "${feature.id}"`);
  seen.add(feature.id);

  if (feature.status === "available" && !feature.evidence)
    errors.push(`"${feature.id}" is available but cites no evidence path in the nami repository`);
  if (feature.horizon === "later" && feature.status !== "roadmap")
    errors.push(`"${feature.id}" is proposed for later but has status "${feature.status}"`);
  if ((feature.horizon === "later") !== (feature.milestone === "later"))
    errors.push(`"${feature.id}" mixes horizon "${feature.horizon}" with milestone "${feature.milestone}"`);
}

for (const pillar of pillars) {
  for (const id of pillar.features ?? []) {
    if (!seen.has(id)) errors.push(`pillar "${pillar.title}" references unknown feature "${id}"`);
  }
}

const milestoneIds = new Set<string>(milestones.map((m) => m.id));
for (const feature of all) {
  if (feature.milestone !== "later" && !milestoneIds.has(feature.milestone))
    errors.push(`"${feature.id}" references unknown milestone "${feature.milestone}"`);
}

// When the nami repository sits next to this one, check that cited evidence still exists.
const namiRepo = process.env.NAMI_REPO ?? join(process.cwd(), "..", "nami");
if (existsSync(namiRepo)) {
  for (const feature of all) {
    if (feature.evidence && !existsSync(join(namiRepo, feature.evidence)))
      errors.push(`"${feature.id}" cites ${feature.evidence}, which is not in ${namiRepo}`);
  }
} else {
  warnings.push(`nami repository not found at ${namiRepo}; evidence paths were not verified`);
}

const ageDays = (Date.now() - Date.parse(`${site.statusAsOf}T00:00:00Z`)) / 86_400_000;
if (ageDays > 45) warnings.push(`statuses were last checked ${Math.floor(ageDays)} days ago (site.statusAsOf); re-check them`);

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (errors.length > 0) {
  console.error(`check:content found ${errors.length} problem(s):\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(`check:content passed (${all.length} features)`);
