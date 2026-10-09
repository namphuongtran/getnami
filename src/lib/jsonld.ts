import type {
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  Organization,
  SoftwareApplication,
  SoftwareSourceCode,
  WebSite,
  WithContext,
} from "schema-dts";
import { absoluteUrl, type PageInfo } from "./routes";
import { site } from "./site";

const orgId = `${site.url}/#organization`;

export function organizationLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: `${site.url}/`,
    logo: absoluteUrl("/brand/nami-logo-512.png"),
    email: site.contactEmail,
    ...(site.repoPublic ? { sameAs: [site.repoUrl] } : {}),
  };
}

export function websiteLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function softwareApplicationLd(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    description: site.description,
    url: `${site.url}/`,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Identity and access management",
    operatingSystem: "Linux, Windows, macOS (.NET 10)",
    softwareVersion: "pre-alpha",
    license: site.licenseUrl,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": orgId },
  };
}

export function softwareSourceCodeLd(): WithContext<SoftwareSourceCode> | null {
  if (!site.repoPublic) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: site.name,
    codeRepository: site.repoUrl,
    programmingLanguage: "C#",
    runtimePlatform: ".NET 10",
    license: site.licenseUrl,
  };
}

export function breadcrumbLd(trail: PageInfo[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.name,
      item: absoluteUrl(page.path),
    })),
  };
}

export function faqLd(items: readonly { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingLd(post: {
  title: string;
  description: string;
  path: string;
  date: string;
  slug: string;
}): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(post.path),
    mainEntityOfPage: absoluteUrl(post.path),
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(`/og/blog-${post.slug}.png`),
    author: { "@type": "Person", name: site.author },
    publisher: { "@id": orgId },
  };
}
