import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageHeader } from "@/components/marketing/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, SpecTag } from "@/components/ui/section";
import { getPost, postPath, posts, type PostMeta } from "@/content/blog/posts";
import { blogPostingLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { pages, type PageInfo } from "@/lib/routes";
import { formatDate } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function pageInfo(post: PostMeta): PageInfo {
  return {
    path: postPath(post.slug),
    slug: `blog-${post.slug}`,
    name: post.title,
    title: post.title,
    description: post.description,
    eyebrow: "Nami blog",
    updated: post.date,
    priority: 0.6,
  };
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata(pageInfo(post), { type: "article", publishedTime: post.date });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  const info = pageInfo(post);

  return (
    <>
      <PageHeader
        page={info}
        trail={[pages.blog, info]}
        title={post.title}
        lead={post.description}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-fg-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.tags.map((tag) => (
            <SpecTag key={tag}>{tag}</SpecTag>
          ))}
        </div>
      </PageHeader>
      <Container className="py-16">
        <article className="prose-nami mx-auto max-w-3xl text-base sm:text-lg">
          <Content />
        </article>
      </Container>
      <CtaBand />
      <JsonLd
        data={blogPostingLd({
          title: post.title,
          description: post.description,
          path: info.path,
          date: post.date,
          slug: post.slug,
        })}
      />
    </>
  );
}
