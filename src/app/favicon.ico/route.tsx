import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og";

// Browsers request /favicon.ico regardless of <link rel="icon">. PNG bytes are accepted at this path.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<OgMark size={32} />, { width: 32, height: 32 });
}
