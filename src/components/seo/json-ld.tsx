import type { Thing, WithContext } from "schema-dts";

/** Renders structured data. `<` is escaped so content can never close the script element. */
export function JsonLd({ data }: { data: WithContext<Thing> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
