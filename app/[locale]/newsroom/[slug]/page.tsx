import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/config";
import { getNewsroomPost, getNewsroomPosts } from "@/lib/content";
import PageHero from "@/components/PageHero";
import MdxArticle from "@/components/MdxArticle";

export function generateStaticParams() {
  const posts = getNewsroomPosts();
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsroomPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary },
  };
}

export default async function NewsroomDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getNewsroomPost(slug);
  if (!post) notFound();

  return (
    <div>
      <PageHero eyebrow={post.tag} title={post.title} lede={post.summary} />
      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <MdxArticle source={post.body} />
      </div>
    </div>
  );
}
