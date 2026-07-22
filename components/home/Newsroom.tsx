import Link from "next/link";
import { getNewsroomPosts } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";

export default function Newsroom({ locale }: { locale: Locale }) {
  const posts = getNewsroomPosts();

  return (
    <section id="newsroom" className="py-[120px] border-t border-line">
      <div className="max-w-[1240px] mx-auto px-8">
        <span className="reveal inline-block bg-yellow text-black font-semibold text-xs tracking-[0.14em] uppercase px-2.5 py-1.5 mb-5">
          Newsroom
        </span>
        <h2 className="reveal display text-[clamp(38px,5.6vw,76px)]">
          What we&apos;re
          <br />
          learning.
        </h2>
        <p className="reveal max-w-[56ch] text-muted mt-6 text-[19px]">
          We publish in twenty languages every day. Here&apos;s what that
          teaches us about how football content actually travels.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-line mt-16 border border-line">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/newsroom/${post.slug}`}
              className="reveal group bg-ink hover:bg-panel transition-colors px-[30px] pt-9 pb-[42px] flex flex-col"
            >
              <span className="mono text-[11px] text-yellow">{post.tag}</span>
              <h3 className="display text-2xl leading-[1.05] mt-4 mb-3">
                {post.title}
              </h3>
              <p className="text-smoke text-[15px] flex-1">{post.summary}</p>
              <span className="mono text-[11px] mt-5 text-paper group-hover:text-yellow transition-colors">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
