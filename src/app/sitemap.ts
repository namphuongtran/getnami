import type { MetadataRoute } from "next";
import { postPath, posts } from "@/content/blog/posts";
import { absoluteUrl, publicPages } from "@/lib/routes";

export const dynamic = "force-static";

// lastModified comes from content dates, not the build time, so search engines can trust it.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicPages().map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: page.updated,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(postPath(post.slug)),
      lastModified: post.date,
      priority: 0.6,
    })),
  ];
}
