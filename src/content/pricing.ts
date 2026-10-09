export interface Plan {
  name: string;
  price: string;
  cadence: string;
  description: string;
  items: string[];
  cta: { label: string; kind: "primary" | "secondary" };
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Community",
    price: "Free",
    cadence: "forever, Apache-2.0",
    description: "The whole identity provider. Run it, fork it, ship it inside your product.",
    items: [
      "Every protocol feature in the core",
      "Unlimited users, tenants and clients",
      "Multi-tenancy, key management and audit",
      "No license keys, no production gates",
      "Community support on GitHub",
    ],
    cta: { label: "Get early access", kind: "secondary" },
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    cadence: "design partnership",
    description: "For teams betting on Nami early and wanting a direct line to the people building it.",
    items: [
      "Early-access builds and input on the roadmap",
      "Architecture and security review of your deployment",
      "Migration planning from commercial identity servers",
      "Support agreements as the project matures",
      "Premium add-ons as they ship",
    ],
    cta: { label: "Talk to us", kind: "primary" },
    featured: true,
  },
];

export const pricingPromise = "The core stays free. Add-ons never gate core features.";
