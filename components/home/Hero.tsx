import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import TacticsBoard from "@/components/home/TacticsBoard";

export default function Hero({ locale }: { locale: Locale }) {
  return (
    <header className="relative pt-[110px] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-8">
        <TacticsBoard />

        <p className="mono text-yellow mb-[22px]">
          Munich · Since 1994 · 20+ languages
        </p>
        <h1 className="display text-[clamp(52px,8.4vw,116px)] max-w-[14ch]">
          Built for football.
          <br />
          Built for <span className="hl">speed.</span>
          <br />
          Built for languages.
        </h1>
        <p className="max-w-[52ch] text-muted mt-[30px] text-[19px]">
          We are the multilingual newsroom behind Europe&apos;s biggest
          football brands. Live commentary, social, artwork and community —
          published natively, in every market, at match tempo.
        </p>
        <div className="flex gap-3.5 mt-10 flex-wrap">
          <Link
            href={`/${locale}/demo`}
            className="inline-block px-[30px] py-4 font-semibold text-[14px] tracking-[0.08em] uppercase bg-yellow text-black hover:bg-white transition-colors"
          >
            Book a demo
          </Link>
          <Link
            href={`/${locale}/work`}
            className="inline-block px-[30px] py-4 font-semibold text-[14px] tracking-[0.08em] uppercase border border-line text-paper hover:border-yellow hover:text-yellow transition-colors"
          >
            See the work
          </Link>
        </div>
      </div>
    </header>
  );
}
