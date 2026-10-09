import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og";

// Square PNG logo for structured data (Organization.logo) and the web manifest.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<OgMark size={512} />, { width: 512, height: 512 });
}
