import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { getServices } from "@/lib/content";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six service lines, one newsroom: live coverage, social, artwork, player connections, community management and social-native education.",
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const services = getServices();

  return (
    <div>
      <PageHero
        eyebrow="Always on"
        title={
          <>
            One newsroom.
            <br />
            Every market.
          </>
        }
        lede="Clubs don't need a translation vendor and a social agency and a design studio. They need one room that can do all three, in the right language, before the moment passes."
      />

      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${loc}/services/${service.slug}`}
              className="bg-ink hover:bg-panel transition-colors px-8 pt-10 pb-[46px]"
            >
              <span className="mono text-[12px] text-yellow">
                {service.number} — {service.category}
              </span>
              <h2 className="display text-[28px] mt-[18px] mb-3.5">
                {service.title}
              </h2>
              <p className="text-smoke text-[15.5px] leading-[1.65]">
                {service.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
