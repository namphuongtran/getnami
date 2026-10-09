// Blog post registry. Each entry has a matching `<slug>.mdx` file in this folder.
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  tags: string[];
}

export const posts: PostMeta[] = [
  {
    slug: "introducing-nami",
    title: "Introducing Nami: an open identity provider for .NET",
    description:
      "Why we are building a free, multi-tenant OAuth 2.0 and OpenID Connect server on OpenIddict, what works today and what comes next.",
    date: "2026-10-09",
    readingMinutes: 6,
    tags: ["Announcement", "OpenIddict", "Multi-tenancy"],
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export function postPath(slug: string): string {
  return `/blog/${slug}/`;
}
