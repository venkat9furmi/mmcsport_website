import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="py-16 pb-10 border-t border-line text-smoke text-sm">
      <div className="max-w-[1240px] mx-auto px-8 flex justify-between gap-10 flex-wrap">
        <div className="flex flex-col gap-2.5">
          <Link href={`/${locale}`} className="display text-yellow text-[22px]">
            mmc sport
          </Link>
          <span>{dict.footer.location}</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <b className="mono text-paper text-[11px] font-medium mb-1.5">
            {dict.footer.servicesHeading}
          </b>
          <Link href={`/${locale}/services`} className="hover:text-yellow">
            {dict.footer.live}
          </Link>
          <Link href={`/${locale}/services`} className="hover:text-yellow">
            {dict.footer.social}
          </Link>
          <Link href={`/${locale}/services`} className="hover:text-yellow">
            {dict.footer.artwork}
          </Link>
          <Link href={`/${locale}/services`} className="hover:text-yellow">
            {dict.footer.community}
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <b className="mono text-paper text-[11px] font-medium mb-1.5">
            {dict.footer.companyHeading}
          </b>
          <Link href={`/${locale}/about`} className="hover:text-yellow">
            {dict.footer.about}
          </Link>
          <Link href={`/${locale}/newsroom`} className="hover:text-yellow">
            {dict.footer.newsroom}
          </Link>
          <Link href={`/${locale}/careers`} className="hover:text-yellow">
            {dict.footer.jobs}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-yellow">
            {dict.footer.audioSamples}
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <b className="mono text-paper text-[11px] font-medium mb-1.5">
            {dict.footer.contactHeading}
          </b>
          <a href="mailto:hello@mmcsport.de" className="hover:text-yellow">
            hello@mmcsport.de
          </a>
          <a href="mailto:jobs@mmcsport.de" className="hover:text-yellow">
            jobs@mmcsport.de
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow"
          >
            {dict.footer.linkedin}
          </a>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-8 mt-12 pt-6 border-t border-line flex gap-6 flex-wrap text-xs">
        <Link href={`/${locale}/contact`} className="hover:text-yellow">
          {dict.footer.contact}
        </Link>
        <Link href={`/${locale}/imprint`} className="hover:text-yellow">
          {dict.footer.imprint}
        </Link>
        <Link href={`/${locale}/privacy`} className="hover:text-yellow">
          {dict.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
