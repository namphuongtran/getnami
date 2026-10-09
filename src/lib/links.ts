import type { Route } from "next";
import { pages, type PageKey } from "./routes";
import { site } from "./site";

/** Href for <Link>. Next adds the trailing slash itself because `trailingSlash` is on. */
export function linkTo(key: PageKey, hash?: string): Route {
  const path = pages[key].path.replace(/\/$/, "") || "/";
  return (hash ? `${path}#${hash}` : path) as Route;
}

export interface Cta {
  label: string;
  href: string;
  external: boolean;
}

/** The main call to action. Points at GitHub only once the nami repository is public. */
export function primaryCta(): Cta {
  return site.repoPublic
    ? { label: "Star on GitHub", href: site.repoUrl, external: true }
    : { label: "Request early access", href: linkTo("contact"), external: false };
}
