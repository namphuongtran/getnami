import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Satori renders OG images at build time and cannot read woff2, so use the TTFs from the geist package.
const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");

export async function ogFonts() {
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
  ];
}

/** The logo mark for Satori, which needs hex colors rather than oklch. */
export function OgMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4fd1e6" />
          <stop offset="1" stopColor="#7a5af5" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#g)" />
      <path
        d="M6 21.5c2.6 0 3.4-7.5 7-7.5s3.6 5 6.2 5c2.4 0 2.9-3.3 6.8-3.3"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23.5" cy="10" r="1.9" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  );
}
