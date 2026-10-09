import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Analytics } from "@/components/layout/analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeScript } from "@/components/layout/theme-script";
import { JsonLd } from "@/components/seo/json-ld";
import { env } from "@/lib/env";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import "./globals.css";

// Downloaded at build time and self-hosted; the Latin subset keeps the preloads small.
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author }],
  creator: site.author,
  keywords: [
    "identity provider",
    ".NET identity provider",
    "ASP.NET Core authentication",
    "OAuth 2.0 server",
    "OpenID Connect provider",
    "OpenIddict",
    "multi-tenant identity",
    "open source IdP",
    "single sign-on",
    "passkeys",
  ],
  robots: env.allowIndexing
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  ...(env.gscVerification ? { verification: { google: env.gscVerification } } : {}),
  formatDetection: { email: false, telephone: false, address: false },
  icons: { apple: "/apple-icon.png" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b111c" },
    { media: "(prefers-color-scheme: light)", color: "#fbfcfe" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        <Analytics />
      </body>
    </html>
  );
}
