import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getWork } from "@/lib/content";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from clubs we run markets for, end to end — Manchester City, Inter Milan, AC Milan and more.",
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const cases = getWork();

  return (
    <div>
      <PageHero eyebrow="Why it works" title="Proof, not logos." lede="Every client wall looks the same. What separates agencies is what happened after the contract was signed." />

      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
          {cases.map((item) => (
            <Link
              key={item.slug}
              href={`/${loc}/work/${item.slug}`}
              className="bg-ink hover:bg-panel transition-colors px-9 pt-11 pb-[50px]"
            >
              <span className="mono text-[12px] text-yellow">{item.client}</span>
              <h2 className="display text-[34px] mt-4 mb-[18px] max-w-[16ch]">
                {item.title}
              </h2>
              <p className="text-smoke text-base">{item.summary}</p>
              <div className="flex gap-9 mt-7 pt-6 border-t border-line">
                {item.results.map((result) => (
                  <div key={result.label}>
                    <b className="display block text-[38px] text-paper leading-none">
                      {result.value}
                    </b>
                    <span className="mono text-[11px] text-smoke">{result.label}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
