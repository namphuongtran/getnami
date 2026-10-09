import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { absoluteUrl } from "@/lib/routes";

export const dynamic = "force-static";

// Indexing stays off until NEXT_PUBLIC_ALLOW_INDEXING=true, which happens at launch.
export default function robots(): MetadataRoute.Robots {
  if (!env.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: env.siteUrl,
  };
}
