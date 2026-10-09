"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { linkTo } from "@/lib/links";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const listeners = new Set<() => void>();

function readConsent(): string | null {
  try {
    return localStorage.getItem("consent");
  } catch {
    return "denied";
  }
}

function decide(value: "granted" | "denied") {
  try {
    localStorage.setItem("consent", value);
  } catch {}
  if (value === "granted") window.gtag?.("consent", "update", { analytics_storage: "granted" });
  listeners.forEach((listener) => listener());
}

export function ConsentBanner() {
  const consent = useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    readConsent,
    () => "pending-server",
  );
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-border bg-bg-elevated p-4 text-sm text-fg-muted shadow-2xl sm:inset-x-auto sm:right-4"
    >
      <p>
        We would like to use Google Analytics to understand which pages help people. No ads, no data sold.{" "}
        <Link href={linkTo("privacy")} className="underline underline-offset-2 hover:text-fg">
          Privacy
        </Link>
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => decide("denied")}
          className="min-h-10 rounded-full px-4 hover:bg-bg-subtle hover:text-fg"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => decide("granted")}
          className="min-h-10 rounded-full bg-fg px-4 font-medium text-bg"
        >
          Allow
        </button>
      </div>
    </div>
  );
}
