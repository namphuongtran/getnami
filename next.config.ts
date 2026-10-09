import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to `out/` for Cloudflare Pages.
  output: "export",
  // Emit `/features/index.html` and link to `/features/`, which Pages serves without redirects.
  trailingSlash: true,
  images: { unoptimized: true },
  typedRoutes: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
