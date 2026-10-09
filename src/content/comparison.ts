// Generic categories only. Never name a specific product or vendor here.
export type Cell = "yes" | "no" | "partial" | { text: string; tone?: "yes" | "no" | "partial" };

export const columns = [
  { key: "nami", title: "Nami", note: "Open source, self-hosted" },
  { key: "commercial", title: "Commercial .NET identity servers", note: "Licensed frameworks" },
  { key: "idaas", title: "Hosted identity services", note: "IDaaS in a vendor cloud" },
  { key: "diy", title: "Roll your own", note: "Built in-house" },
] as const;

export type ColumnKey = (typeof columns)[number]["key"];

export const rows: { label: string; cells: Record<ColumnKey, Cell> }[] = [
  {
    label: "License cost",
    cells: {
      nami: { text: "Free, Apache-2.0", tone: "yes" },
      commercial: { text: "Per-client or per-instance fees", tone: "partial" },
      idaas: { text: "Per monthly active user", tone: "partial" },
      diy: { text: "Free, plus your team's time", tone: "partial" },
    },
  },
  {
    label: "License keys or production gates",
    cells: { nami: { text: "None", tone: "yes" }, commercial: { text: "Typically", tone: "no" }, idaas: { text: "Plan limits", tone: "partial" }, diy: { text: "None", tone: "yes" } },
  },
  {
    label: "Source code you can read and fork",
    cells: { nami: "yes", commercial: { text: "Varies", tone: "partial" }, idaas: "no", diy: "yes" },
  },
  {
    label: "Runs in your own infrastructure",
    cells: { nami: "yes", commercial: "yes", idaas: "no", diy: "yes" },
  },
  {
    label: "User data stays in your database",
    cells: { nami: "yes", commercial: "yes", idaas: "no", diy: "yes" },
  },
  {
    label: "Multi-tenancy built in",
    cells: { nami: { text: "Pool or silo", tone: "yes" }, commercial: { text: "Often extra work", tone: "partial" }, idaas: "yes", diy: { text: "Build it yourself", tone: "no" } },
  },
  {
    label: "Native ASP.NET Core integration",
    cells: { nami: "yes", commercial: "yes", idaas: { text: "Through SDKs", tone: "partial" }, diy: "yes" },
  },
  {
    label: "Unsafe configuration refused at startup",
    cells: { nami: "yes", commercial: { text: "Varies", tone: "partial" }, idaas: { text: "Managed for you", tone: "yes" }, diy: "no" },
  },
  {
    label: "Tamper-evident audit log",
    cells: { nami: "yes", commercial: { text: "Varies", tone: "partial" }, idaas: { text: "Vendor logs", tone: "partial" }, diy: "no" },
  },
  {
    label: "Admin UI included",
    cells: { nami: { text: "On the roadmap", tone: "partial" }, commercial: { text: "Often sold separately", tone: "partial" }, idaas: "yes", diy: "no" },
  },
  {
    label: "Protocol engine maintained by",
    cells: {
      nami: { text: "OpenIddict project", tone: "yes" },
      commercial: { text: "The vendor", tone: "yes" },
      idaas: { text: "The vendor", tone: "yes" },
      diy: { text: "You", tone: "no" },
    },
  },
];

/** Rows shown on the landing page preview. */
export const previewRowCount = 6;
