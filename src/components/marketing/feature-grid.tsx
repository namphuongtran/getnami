import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { features } from "@/content/features";
import { linkTo } from "@/lib/links";
import { FeatureCard } from "./feature-card";

export function FeatureGrid() {
  const highlighted = features.filter((f) => "highlight" in f && f.highlight);
  const counts = {
    available: features.filter((f) => f.status === "available").length,
    total: features.length,
  };
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Enterprise identity, honestly labeled"
      description={`${counts.total} capabilities on the map, ${counts.available} available today. Every badge on this site is checked against the source.`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlighted.map((feature) => (
          <div key={feature.id} className="reveal">
            <FeatureCard feature={feature} />
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <ButtonLink href={linkTo("features")} variant="secondary">
          Explore all {counts.total} features
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </Section>
  );
}
