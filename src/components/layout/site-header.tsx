import Link from "next/link";
import { Logo, GitHubIcon } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { linkTo, primaryCta } from "@/lib/links";
import { site } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { mainNav } from "./nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const cta = primaryCta();
  const items = mainNav.map((item) => ({ href: linkTo(item.key), label: item.label }));
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/55">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:bg-bg-elevated focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Nami home" className="shrink-0">
          <Logo gradientId="nami-mark-header" />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          {site.repoPublic && (
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nami on GitHub"
              className="hidden size-11 items-center justify-center rounded-full text-fg-muted hover:bg-bg-subtle hover:text-fg sm:inline-flex"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
          )}
          <ThemeToggle />
          <span className="ml-1 hidden sm:block">
            <ButtonLink href={cta.href} external={cta.external} size="sm">
              {cta.label}
            </ButtonLink>
          </span>
          <MobileNav items={items} cta={cta} />
        </div>
      </div>
    </header>
  );
}
