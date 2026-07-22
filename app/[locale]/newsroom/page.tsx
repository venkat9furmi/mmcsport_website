import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getNewsroomPosts } from "@/lib/content";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Reports, analysis and playbooks from a newsroom that publishes in twenty languages every day.",
};

export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const posts = getNewsroomPosts();

  return (
    <div>
      <PageHero
        eyebrow="Newsroom"
        title={
          <>
            What we&apos;re
            <br />
            learning.
          </>
        }
        lede="We publish in twenty languages every day. Here's what that teaches us about how football content actually travels."
      />

      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${loc}/newsroom/${post.slug}`}
              className="group bg-ink hover:bg-panel transition-colors px-[30px] pt-9 pb-[42px] flex flex-col"
            >
              <span className="mono text-[11px] text-yellow">{post.tag}</span>
              <h2 className="display text-2xl leading-[1.05] mt-4 mb-3">
                {post.title}
              </h2>
              <p className="text-smoke text-[15px] flex-1">{post.summary}</p>
              <span className="mono text-[11px] mt-5 text-paper group-hover:text-yellow transition-colors">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
