// NuGet packages from nami docs/design/01-foundations.md section 3.1.
// Nothing is published to NuGet yet; "available" means the project exists and is packable.
import type { Status } from "./types";

export interface NamiPackage {
  name: string;
  purpose: string;
  status: Status;
}

export const packageGroups: { title: string; packages: NamiPackage[] }[] = [
  {
    title: "Core",
    packages: [
      { name: "Nami.Identity", purpose: "Meta-package that pulls in the recommended set", status: "roadmap" },
      { name: "Nami.Identity.Abstractions", purpose: "Ports, client and scope definitions", status: "available" },
      { name: "Nami.Identity.Core", purpose: "OpenIddict wiring, handlers and the security gate", status: "available" },
      { name: "Nami.Identity.Keys", purpose: "Signing key management and first-key seeding", status: "available" },
    ],
  },
  {
    title: "Persistence",
    packages: [
      { name: "Nami.Identity.EntityFrameworkCore", purpose: "Stores, tenancy chain, audit sink, key store", status: "available" },
      { name: "Nami.Identity.EntityFrameworkCore.PostgreSQL", purpose: "UsePostgreSQL() and every migration", status: "available" },
    ],
  },
  {
    title: "Users and APIs",
    packages: [
      { name: "Nami.Identity.Users", purpose: "ASP.NET Core Identity, MFA and passkeys", status: "in-progress" },
      { name: "Nami.Identity.Validation", purpose: "Resource server validation", status: "roadmap" },
      { name: "Nami.Identity.DPoP", purpose: "DPoP for the server", status: "roadmap" },
      { name: "Nami.Identity.Validation.DPoP", purpose: "DPoP proof checks for APIs", status: "roadmap" },
      { name: "Nami.Identity.Bff", purpose: "Backend for frontend, plus Bff.Yarp", status: "roadmap" },
    ],
  },
  {
    title: "Adapters",
    packages: [
      { name: "Nami.Identity.Keys.Azure", purpose: "Azure Key Vault", status: "roadmap" },
      { name: "Nami.Identity.Keys.Aws", purpose: "AWS KMS and Secrets Manager", status: "roadmap" },
      { name: "Nami.Identity.Keys.Gcp", purpose: "Google Cloud KMS and Secret Manager", status: "roadmap" },
      { name: "Nami.Identity.Keys.Vault", purpose: "HashiCorp Vault", status: "roadmap" },
      { name: "Nami.Identity.Email.*", purpose: "SMTP, SendGrid, Amazon SES, Azure Communication Services", status: "roadmap" },
      { name: "Nami.Identity.OpenTelemetry", purpose: "Traces, metrics and logs", status: "roadmap" },
    ],
  },
];

export const ecosystem = [
  { name: "ASP.NET Core 10", role: "Hosting, routing, authentication" },
  { name: "OpenIddict 7", role: "OAuth 2.0 and OpenID Connect engine" },
  { name: "EF Core 10", role: "Persistence and migrations" },
  { name: "PostgreSQL 18", role: "Storage and row-level security" },
  { name: "ASP.NET Core Identity", role: "Users, lockout, passkeys" },
  { name: "Data Protection", role: "Key wrapping at rest" },
  { name: "Finbuckle.MultiTenant", role: "Tenant resolution" },
  { name: "YARP", role: "Backend-for-frontend proxy" },
  { name: "OpenTelemetry", role: "Traces, metrics, logs" },
  { name: "Quartz.NET", role: "Clustered background jobs" },
] as const;
