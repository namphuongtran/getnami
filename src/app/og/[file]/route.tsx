import { ImageResponse } from "next/og";
import { posts } from "@/content/blog/posts";
import { OgMark, ogFonts } from "@/lib/og";
import { publicPages } from "@/lib/routes";
import { site } from "@/lib/site";

// Writes out/og/<slug>.png at build time. A `.png` route rather than opengraph-image.tsx,
// because the static export would write that convention as a file with no extension.
export const dynamic = "force-static";
export const dynamicParams = false;

interface Card {
  file: string;
  eyebrow: string;
  title: string;
}

function cards(): Card[] {
  return [
    ...publicPages().map((page) => ({
      file: `${page.slug}.png`,
      eyebrow: page.eyebrow,
      title: page.slug === "home" ? site.tagline : page.title.split(":")[0],
    })),
    ...posts.map((post) => ({ file: `blog-${post.slug}.png`, eyebrow: "Nami blog", title: post.title })),
  ];
}

export function generateStaticParams() {
  return cards().map((card) => ({ file: card.file }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[file]">) {
  const { file } = await params;
  const card = cards().find((c) => c.file === file);
  if (!card) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Geist",
          color: "#f1f5fa",
          backgroundColor: "#0b111c",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(79,209,230,0.32), transparent 45%), radial-gradient(circle at 88% 10%, rgba(122,90,245,0.3), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <OgMark size={64} />
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>nami</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#6fdcef", letterSpacing: 4, textTransform: "uppercase" }}>
            {card.eyebrow}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: card.title.length > 48 ? 60 : 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 1000,
            }}
          >
            {card.title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9aa7bb" }}>
          <div>{site.domain}</div>
          <div>Open source · .NET 10 · OpenIddict · Apache-2.0</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await ogFonts() },
  );
}
