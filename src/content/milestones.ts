// Milestones come from the Roadmap table in nami's README; phases from docs/BUILD-PLAN.md.
import { features } from "./features";
import type { MilestoneId, PhaseId, Status } from "./types";

export interface Phase {
  id: PhaseId;
  title: string;
  scope: string;
  status: Status;
}

export interface Milestone {
  id: Exclude<MilestoneId, "later">;
  title: string;
  scope: string;
  phases: PhaseId[];
}

export const phases: Record<PhaseId, Phase> = {
  "01": {
    id: "01",
    title: "Foundations",
    scope: "Dependency injection, five DbContexts, cloud adapter ports, health and readiness.",
    status: "available",
  },
  "02": {
    id: "02",
    title: "Database",
    scope: "Pool and silo isolation, row-level security, the tenant closure table, migrations.",
    status: "available",
  },
  "03": {
    id: "03",
    title: "Core protocol",
    scope: "Code flow with PKCE, client credentials, refresh, consent, revocation, introspection, the key store and audit chain.",
    status: "available",
  },
  "04": {
    id: "04",
    title: "Users and MFA",
    scope: "ASP.NET Core Identity, TOTP, passkeys, external login, server-side sessions, acr and amr.",
    status: "in-progress",
  },
  "05": {
    id: "05",
    title: "UI and consent",
    scope: "Razor login, consent, logout, tenant switcher, step-up and single logout.",
    status: "roadmap",
  },
  "06": {
    id: "06",
    title: "Admin",
    scope: "Admin API, admin app, authorization engine, erasure, tenant lifecycle and the BFF.",
    status: "roadmap",
  },
  "07": {
    id: "07",
    title: "Advanced flows",
    scope: "Device code, PAR, token exchange, mutual TLS and DPoP.",
    status: "roadmap",
  },
  "08": {
    id: "08",
    title: "Keys and rotation",
    scope: "No-restart rotation, envelope encryption, cloud key stores, break-glass.",
    status: "roadmap",
  },
  "09": {
    id: "09",
    title: "Testing and deployment",
    scope: "Conformance, load testing, OpenTelemetry, container image, CI and CD. Spans every milestone.",
    status: "roadmap",
  },
};

export const milestones: Milestone[] = [
  {
    id: "M1",
    title: "Core protocol server",
    scope: "Issues tokens with authorization code and PKCE and client credentials, persisted in PostgreSQL.",
    phases: ["01", "02", "03"],
  },
  {
    id: "M2",
    title: "Usable login",
    scope: "User management, MFA, the login and consent UI, and a docker compose quickstart.",
    phases: ["04", "05"],
  },
  {
    id: "M3",
    title: "Hardening",
    scope: "No-restart key rotation, observability and a security review.",
    phases: ["08"],
  },
  {
    id: "M4",
    title: "Admin and advanced flows",
    scope: "Admin API and app, DPoP, mutual TLS, PAR, device flow and token exchange.",
    phases: ["06", "07"],
  },
  {
    id: "M5",
    title: "Conformance",
    scope: "OpenID certification and a migration guide from commercial identity servers.",
    phases: ["09"],
  },
];

/** The phase being built right now. */
export const currentPhase: PhaseId = "04";

/** A milestone is available when all its features are, in progress when any is started. */
export function milestoneStatus(id: Milestone["id"]): Status {
  const items = features.filter((f) => f.milestone === id);
  if (items.length > 0 && items.every((f) => f.status === "available")) return "available";
  if (items.some((f) => f.status !== "roadmap")) return "in-progress";
  return "roadmap";
}

export function milestoneFeatures(id: MilestoneId) {
  return features.filter((f) => f.milestone === id);
}
