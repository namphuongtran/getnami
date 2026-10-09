"use client";

import { Menu, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Cta } from "@/lib/links";

interface MobileNavProps {
  items: { href: Route; label: string }[];
  cta: Cta;
}

export function MobileNav({ items, cta }: MobileNavProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close the sheet after client-side navigation.
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex size-11 items-center justify-center rounded-full text-fg-muted hover:bg-bg-subtle hover:text-fg lg:hidden"
        aria-label="Open menu"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      <dialog
        ref={dialog}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(22rem,100vw)] max-w-none border-l border-border bg-bg-elevated p-0 text-fg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="flex h-full flex-col p-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="inline-flex size-11 items-center justify-center rounded-full text-fg-muted hover:bg-bg-subtle hover:text-fg"
              aria-label="Close menu"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-2">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => dialog.current?.close()}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base text-fg-muted hover:bg-bg-subtle hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-6">
            {cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center rounded-full bg-fg text-sm font-medium text-bg"
              >
                {cta.label}
              </a>
            ) : (
              <Link
                href={cta.href as Route}
                onClick={() => dialog.current?.close()}
                className="flex min-h-12 items-center justify-center rounded-full bg-fg text-sm font-medium text-bg"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
