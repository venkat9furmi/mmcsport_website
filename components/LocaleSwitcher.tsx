"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export default function LocaleSwitcher({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(en|de)/, "");

  return (
    <div className={`flex mono text-[11px] ${className}`} role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          aria-current={l === locale ? "true" : undefined}
          className={`w-9 h-9 flex items-center justify-center border border-line -ml-px first:ml-0 transition-colors ${
            l === locale
              ? "text-yellow border-yellow"
              : "text-smoke hover:text-paper hover:border-paper"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
