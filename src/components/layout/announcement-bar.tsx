import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { linkTo } from "@/lib/links";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-border bg-bg-subtle/80 text-center text-xs text-fg-muted backdrop-blur">
      <Link
        href={linkTo("roadmap")}
        className="group mx-auto flex min-h-9 max-w-6xl items-center justify-center gap-2 px-4 py-2 hover:text-fg"
      >
        <span className="shrink-0 rounded-full bg-wip-bg px-2 py-0.5 font-medium whitespace-nowrap text-wip">{site.stage}</span>
        <span>
          Built in public. The core token server is done; users, MFA and passkeys are in progress.
        </span>
        <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
