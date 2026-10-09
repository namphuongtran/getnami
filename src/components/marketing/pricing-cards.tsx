import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { plans, pricingPromise } from "@/content/pricing";
import { cn } from "@/lib/cn";
import { linkTo, primaryCta } from "@/lib/links";

export function PricingCards() {
  const community = primaryCta();
  return (
    <div>
      <div className="mx-auto grid grid-cols-1 max-w-4xl gap-4 md:grid-cols-2">
        {plans.map((plan) => {
          const href = plan.featured ? linkTo("contact") : community.href;
          return (
            <article
              key={plan.name}
              className={cn(
                "reveal relative flex flex-col rounded-2xl p-7",
                plan.featured ? "border-gradient shadow-2xl shadow-black/20" : "card",
              )}
            >
              {plan.featured && (
                <div aria-hidden className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-brand/25 to-accent/25 blur-2xl" />
              )}
              <h3 className="text-sm font-semibold tracking-wide text-fg-muted uppercase">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                <span className="text-sm text-fg-subtle">{plan.cadence}</span>
              </p>
              <p className="mt-3 text-sm text-fg-muted">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-fg-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={href}
                external={!plan.featured && community.external}
                variant={plan.cta.kind}
                className="mt-8 w-full"
              >
                {plan.featured ? plan.cta.label : community.label}
              </ButtonLink>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-fg-muted">{pricingPromise}</p>
    </div>
  );
}
