import type { FeatureId } from "./features";

export type PillarIcon = "scale" | "engine" | "tenants" | "key" | "cloud" | "admin";

export interface Pillar {
  title: string;
  body: string;
  icon: PillarIcon;
  /** Features listed under the pillar, each with its own status badge. */
  features?: FeatureId[];
  /** Plain facts for pillars that are not features (licensing). */
  points?: string[];
}

export const pillars: Pillar[] = [
  {
    title: "Free and open",
    body: "Apache-2.0. No license keys, no production gates, no paid tiers on the core. Ever.",
    icon: "scale",
    points: [
      "Apache-2.0 license, patent grant included",
      "Permissive dependencies only: MIT, Apache-2.0, BSD",
      "Every architecture decision recorded as an ADR",
    ],
  },
  {
    title: "Built on OpenIddict",
    body: "The protocol engine is OpenIddict, a mature open-source foundation. Nami adds the opinionated product layer.",
    icon: "engine",
    features: ["auth-code-pkce", "refresh-rotation", "introspection-revocation"],
  },
  {
    title: "Multi-tenant by design",
    body: "Tenant isolation is a first-class concept, enforced in the app and again in PostgreSQL.",
    icon: "tenants",
    features: ["pool-silo", "per-tenant-issuer", "row-level-security"],
  },
  {
    title: "Keys that manage themselves",
    body: "Keys are created at first start, wrapped at rest and rotated without a restart.",
    icon: "key",
    features: ["key-store", "key-rotation", "cloud-kms"],
  },
  {
    title: "Cloud-agnostic",
    body: "Runs anywhere .NET runs. Key stores, secrets and email are ports with adapters.",
    icon: "cloud",
    features: ["postgresql", "container-helm", "opentelemetry"],
  },
  {
    title: "Admin included",
    body: "A REST admin API and a server-rendered admin app, with RBAC and dual-control approvals.",
    icon: "admin",
    features: ["admin-api", "admin-app", "dual-control"],
  },
];
