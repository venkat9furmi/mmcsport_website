import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getWork, getWorkCase } from "@/lib/content";
import PageHero from "@/components/PageHero";
import MdxArticle from "@/components/MdxArticle";

export function generateStaticParams() {
  const cases = getWork();
  return locales.flatMap((locale) =>
    cases.map((item) => ({ locale, slug: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkCase(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const item = getWorkCase(slug);
  if (!item) notFound();

  return (
    <div>
      <PageHero eyebrow={item.client} title={item.title} lede={item.summary} />
      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="flex gap-9 mb-12 pb-8 border-b border-line">
          {item.results.map((result) => (
            <div key={result.label}>
              <b className="display block text-[38px] text-paper leading-none">
                {result.value}
              </b>
              <span className="mono text-[11px] text-smoke">{result.label}</span>
            </div>
          ))}
        </div>
        <MdxArticle source={item.body} />
        <Link
          href={`/${loc}/demo`}
          className="inline-block mt-12 px-[30px] py-4 font-semibold text-[14px] tracking-[0.08em] uppercase bg-yellow text-black hover:bg-white transition-colors"
        >
          Book a demo
        </Link>
      </div>
    </div>
  );
}
