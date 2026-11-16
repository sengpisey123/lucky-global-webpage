import Link from "next/link";

import type { Locale } from "@/lib/site-content";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const nextLocale = locale === "ja" ? "km" : "ja";

  return (
    <Link
      href={`/${nextLocale}`}
      className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[color:var(--forest)] transition hover:bg-white"
    >
      {label}
    </Link>
  );
}