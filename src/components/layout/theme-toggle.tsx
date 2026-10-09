"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light" | "system";

const order: Theme[] = ["dark", "light", "system"];
const labels: Record<Theme, string> = { dark: "Dark", light: "Light", system: "System" };

function apply(theme: Theme) {
  const resolved =
    theme === "system" ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : theme;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = theme;
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = matchMedia("(prefers-color-scheme: light)");
  const onMedia = () => {
    if (document.documentElement.dataset.theme === "system") apply("system");
  };
  media.addEventListener("change", onMedia);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMedia);
  };
}

function read(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "system" ? value : "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, read, () => "dark");
  const next = order[(order.indexOf(theme) + 1) % order.length];
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.setItem("theme", next);
        } catch {}
        apply(next);
      }}
      className="inline-flex size-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
      aria-label={`Theme: ${labels[theme]}. Switch to ${labels[next]}.`}
      title={`Theme: ${labels[theme]}`}
    >
      <Icon aria-hidden className="size-[18px]" />
    </button>
  );
}
