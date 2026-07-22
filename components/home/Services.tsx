import Link from "next/link";
import { getServices } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";

export default function Services({ locale }: { locale: Locale }) {
  const services = getServices();

  return (
    <section id="services" className="py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <span className="reveal inline-block bg-yellow text-black font-semibold text-xs tracking-[0.14em] uppercase px-2.5 py-1.5 mb-5">
          Always on
        </span>
        <h2 className="reveal display text-[clamp(38px,5.6vw,76px)]">
          One newsroom.
          <br />
          Every market.
        </h2>
        <p className="reveal max-w-[56ch] text-muted mt-6 text-[19px]">
          Clubs don&apos;t need a translation vendor and a social agency and
          a design studio. They need one room that can do all three, in the
          right language, before the moment passes.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-line mt-16 border border-line">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="reveal bg-ink hover:bg-panel transition-colors px-8 pt-10 pb-[46px]"
            >
              <span className="mono text-[12px] text-yellow">
                {service.number} — {service.category}
              </span>
              <h3 className="display text-[28px] mt-[18px] mb-3.5">
                {service.title}
              </h3>
              <p className="text-smoke text-[15.5px] leading-[1.65]">
                {service.summary}
              </p>
              <ul className="list-slash mt-4.5">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-smoke py-1.5">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
