import type { Metadata } from "next";
import type { PageInfo } from "./routes";
import { site } from "./site";

interface BuildMetadataOptions {
  type?: "website" | "article";
  publishedTime?: string;
  /** Overrides the OG image slug, e.g. for blog posts. */
  ogSlug?: string;
}

/**
 * Complete per-page metadata. Next merges metadata shallowly, so a page that sets `openGraph`
 * would lose the layout's fields; this helper always returns the whole object.
 */
export function buildMetadata(page: PageInfo, options: BuildMetadataOptions = {}): Metadata {
  const image = {
    url: `/og/${options.ogSlug ?? page.slug}.png`,
    width: 1200,
    height: 630,
    alt: `${page.eyebrow}: ${site.name}`,
  };
  return {
    title: page.path === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: options.type ?? "website",
      url: page.path,
      siteName: site.name,
      locale: "en_US",
      title: page.title,
      description: page.description,
      images: [image],
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image.url],
    },
  };
}
