import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0b111c",
    theme_color: "#0b111c",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/nami-logo-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
