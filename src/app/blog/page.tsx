import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/page-header";
import { Container } from "@/components/ui/section";
import { posts, postPath } from "@/content/blog/posts";
import { buildMetadata } from "@/lib/metadata";
import { pages } from "@/lib/routes";
import { formatDate } from "@/lib/site";

export const metadata = buildMetadata(pages.blog);

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader
        page={pages.blog}
        title="Notes from the build"
        lead="How an open-source identity provider for .NET gets designed, decided and built, one milestone at a time."
      />
      <Container className="py-16">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={postPath(post.slug).replace(/\/$/, "") as Route}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-border-strong"
              >
                <p className="font-mono text-xs text-fg-subtle">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-brand">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-fg-muted">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-brand">
                  Read the post
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
