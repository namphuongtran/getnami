import type { Route } from "next";
import Link from "next/link";
import { GitHubIcon, Logo } from "@/components/brand/logo";
import { linkTo } from "@/lib/links";
import { site } from "@/lib/site";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export function SiteFooter() {
  const groups: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: linkTo("features") },
        { label: "For .NET", href: linkTo("dotnet") },
        { label: "Security", href: linkTo("security") },
        { label: "Roadmap", href: linkTo("roadmap") },
        { label: "Compare", href: linkTo("compare") },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Pricing", href: linkTo("pricing") },
        { label: "Blog", href: linkTo("blog") },
        { label: "FAQ", href: linkTo("faq") },
        { label: "Contact", href: linkTo("contact") },
        { label: "Privacy", href: linkTo("privacy") },
      ],
    },
    {
      title: "Open source",
      links: [
        ...(site.repoPublic
          ? [
              { label: "GitHub", href: site.repoUrl, external: true },
              { label: "Releases", href: `${site.repoUrl}/releases`, external: true },
              { label: "Discussions", href: `${site.repoUrl}/discussions`, external: true },
            ]
          : [{ label: "Request early access", href: linkTo("contact") }]),
        { label: "Apache-2.0 license", href: site.licenseUrl, external: true },
        { label: "OpenIddict", href: "https://documentation.openiddict.com/", external: true },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-border bg-bg-subtle/50">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo gradientId="nami-mark-footer" />
          <p className="mt-4 text-sm text-fg-muted">
            The open-source, multi-tenant identity provider for .NET. Built on OpenIddict and PostgreSQL.
          </p>
          {site.repoPublic && (
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg"
            >
              <GitHubIcon /> Star the repository
            </a>
          )}
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-medium text-fg">{group.title}</h2>
            <ul className="mt-4 space-y-1">
              {group.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center text-sm text-fg-muted hover:text-fg"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href as Route}
                      className="inline-flex min-h-9 items-center text-sm text-fg-muted hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © 2026 {site.author} and Nami contributors. Nami is licensed under Apache-2.0.
          </p>
          <p>
            Statuses checked {site.statusAsOf} against nami@{site.sourceCommit}.
          </p>
        </div>
      </div>
    </footer>
  );
}
