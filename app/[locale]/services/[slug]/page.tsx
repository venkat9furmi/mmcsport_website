import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getService, getServices } from "@/lib/content";
import PageHero from "@/components/PageHero";
import MdxArticle from "@/components/MdxArticle";

export function generateStaticParams() {
  const services = getServices();
  return locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <div>
      <PageHero
        eyebrow={`${service.number} — ${service.category}`}
        title={service.title}
        lede={service.summary}
      />
      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <MdxArticle source={service.body} />
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
