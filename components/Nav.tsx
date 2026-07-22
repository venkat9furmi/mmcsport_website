"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Nav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/work`, label: dict.nav.work },
    { href: `/${locale}#languages`, label: dict.nav.languages },
    { href: `/${locale}/newsroom`, label: dict.nav.newsroom },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-ink/88 backdrop-blur-md border-b border-line">
      <div className="max-w-[1240px] mx-auto px-8 flex items-center justify-between h-[72px]">
        <Link href={`/${locale}`} className="display text-yellow text-[26px]">
          mmc sport
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-[0.1em] uppercase text-smoke hover:text-paper transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <LocaleSwitcher locale={locale} />
          <ThemeToggle />

          <Link
            href={`/${locale}/demo`}
            className="bg-yellow text-black font-semibold px-5 py-[11px] hover:bg-white transition-colors"
          >
            {dict.nav.demo}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="text-paper text-2xl"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden border-t border-line bg-ink ${open ? "block" : "hidden"}`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block px-8 py-4 border-b border-line text-sm tracking-[0.1em] uppercase font-medium"
          >
            {link.label}
          </Link>
        ))}
        <div className="px-8 py-4 border-b border-line">
          <LocaleSwitcher locale={locale} />
        </div>
        <Link
          href={`/${locale}/demo`}
          onClick={() => setOpen(false)}
          className="block px-8 py-4 bg-yellow text-black text-sm tracking-[0.1em] uppercase font-medium"
        >
          {dict.nav.demo}
        </Link>
      </div>
    </nav>
  );
}
