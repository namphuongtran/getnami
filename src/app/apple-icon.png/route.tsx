import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og";

// iOS home screen icon. Linked from the root layout's metadata.icons.apple.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0b111c" }}>
        <OgMark size={150} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
