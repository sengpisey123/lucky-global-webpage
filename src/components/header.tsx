"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type { Locale, SiteContent } from "@/lib/site-content";

type HeaderProps = {
  locale: Locale;
  content: SiteContent;
};

export function Header({ locale, content }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const nextLocale = locale === "ja" ? "km" : "ja";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border)] bg-white/95 shadow-sm backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-4 px-6 py-3 lg:px-10">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Lucky Global"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-[color:var(--forest)] lg:text-lg">
              Lucky Global
            </span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)] sm:block">
              {content.hero.eyebrow}
            </span>
          </div>
        </Link>

        {/* Desktop nav â€” 6 links + language toggle */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-[color:var(--muted)] transition hover:bg-[color:var(--forest)]/5 hover:text-[color:var(--forest)]"
            >
              {item.label}
            </a>
          ))}

          {/* Language toggle â€” last item in nav */}
          <Link
            href={`/${nextLocale}`}
            className="ml-2 inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--forest)] px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[color:var(--accent-strong)]"
          >
            {content.switchLabel}
          </Link>
        </nav>

        {/* Hamburger â€” shown on < lg */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-[color:var(--muted)] transition hover:bg-black/5 lg:hidden"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[color:var(--border)] bg-white px-4 pb-5 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[color:var(--muted)] transition hover:bg-[color:var(--forest)]/5 hover:text-[color:var(--forest)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language toggle in mobile drawer */}
          <div className="mt-3 border-t border-[color:var(--border)] pt-4">
            <Link
              href={`/${nextLocale}`}
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full border border-[color:var(--forest)] bg-[color:var(--forest)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]"
            >
              {content.switchLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
