export interface FaqItem {
  question: string;
  answer: string;
  /** Shown in the landing page FAQ preview. */
  top?: boolean;
}

export const faq: FaqItem[] = [
  {
    question: "What is Nami?",
    answer:
      "Nami is an open-source OAuth 2.0 and OpenID Connect identity provider for .NET. It issues tokens for your web apps, mobile apps, services and APIs, isolates tenants, manages its own signing keys and records a tamper-evident audit trail. It is built on the OpenIddict protocol engine and PostgreSQL.",
    top: true,
  },
  {
    question: "Can I run Nami in production today?",
    answer:
      "Not yet. Nami is pre-alpha and built in public. The core token server (milestone M1) is built and covered by more than a thousand automated tests; users, MFA and passkeys are being built now. The roadmap page shows exactly what is available, in progress and planned.",
    top: true,
  },
  {
    question: "How is Nami licensed? Will it stay free?",
    answer:
      "Nami is licensed under Apache-2.0. There are no license keys, no production gates and no paid tiers on the core, and that will not change. Optional add-ons and support for enterprises may come later, and they will never gate core features.",
    top: true,
  },
  {
    question: "How does Nami relate to OpenIddict?",
    answer:
      "OpenIddict is the protocol engine: it implements OAuth 2.0 and OpenID Connect. Nami is the product around it: multi-tenancy, key management, users and MFA, secure defaults, audit, admin and deployment. Nami never re-implements what the engine already does.",
    top: true,
  },
  {
    question: "Can I move from a commercial identity server to Nami?",
    answer:
      "That is a core goal. Nami speaks standard OAuth 2.0 and OpenID Connect, so relying parties and APIs keep working with standard middleware such as JwtBearer. A migration guide for clients, scopes, resources and users is part of milestone M5. Talk to us if you want help planning a move.",
    top: true,
  },
  {
    question: "Which databases does Nami support?",
    answer:
      "PostgreSQL 18, by design. Supporting one engine deeply lets Nami use row-level security as a second line of tenant isolation, UUIDv7 keys and tested migrations, instead of the lowest common denominator across engines.",
  },
  {
    question: "Which .NET version do I need?",
    answer: "Nami targets .NET 10 and ASP.NET Core 10, and tracks new .NET releases.",
  },
  {
    question: "How does multi-tenancy work?",
    answer:
      "Each tenant gets its own issuer, resolved from the host name (acme.id.example.com) or a path (/t/acme). Tenants can share a pooled database or have a dedicated silo database. In the pool, PostgreSQL row-level security enforces isolation even if application code makes a mistake.",
  },
  {
    question: "Does Nami support SAML, SCIM or LDAP?",
    answer:
      "Not in v1. SAML 2.0 and WS-Federation, SCIM provisioning and Windows authentication are proposed for after v1. Nami federates with external OpenID Connect providers such as Microsoft Entra ID and Google in v1.",
  },
  {
    question: "Does Nami help with GDPR?",
    answer:
      "Nami is built to support GDPR: data subject rights including erasure that keeps the audit chain verifiable, restriction of processing and data residency controls are on the roadmap. Whether a deployment meets a regulation is decided by the organization that runs it.",
  },
  {
    question: "Is there commercial support?",
    answer:
      "Nami is a young project. Enterprises can talk to us about design partnership, early access, architecture and security reviews, and migration planning. Use the contact page.",
  },
  {
    question: "Where is the documentation?",
    answer:
      "Over a hundred architecture decision records and two dozen design documents live in the repository today. A documentation site and a five-minute quickstart arrive with milestone M2.",
  },
];
