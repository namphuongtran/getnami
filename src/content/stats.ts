// Every number carries the date and source it was measured from.
export interface Stat {
  value: string;
  label: string;
  source: string;
}

export const stats: Stat[] = [
  {
    value: "1,022",
    label: "automated tests",
    source: "dotnet test, 2026-10-04 at 277b7de: unit, contract, architecture and integration",
  },
  {
    value: "100+",
    label: "architecture decision records",
    source: "docs/adr in the nami repository, 2026-10-09",
  },
  {
    value: "15 min",
    label: "default access token lifetime",
    source: "NamiIdentityOptions.AccessTokenLifetime",
  },
  {
    value: "0",
    label: "license keys, ever",
    source: "Apache-2.0, README",
  },
];
