import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LanguagesMarquee from "@/components/home/LanguagesMarquee";

export const metadata: Metadata = {
  title: "About",
  description:
    "mmc sport is a newsroom, not an agency — journalists, translators, commentators and designers in Munich since 1994.",
};

const FACTS = [
  { label: "Founded", value: "Munich, 1994" },
  { label: "Team", value: "Journalists, translators, commentators, designers" },
  { label: "Coverage", value: "365 days a year, matchday to matchday" },
  { label: "Languages", value: "20+ and growing" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title={
          <>
            A newsroom,
            <br />
            not an agency.
          </>
        }
      />

      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-[1.1fr_.9fr] gap-20 items-start">
          <div>
            <p className="text-muted text-lg mb-5">
              Most agencies hire translators when a brief comes in. We employ
              them — sports journalists, commentators, voice-over artists,
              editors and community managers, sitting in one room in Munich
              and across the markets we cover.
            </p>
            <p className="text-muted text-lg mb-5">
              That&apos;s why the work reads like it was written where it
              lands. Because it was.
            </p>
            <p className="text-muted text-lg mb-5">
              Thirty years in international football communication. UEFA,
              the DFB, the Bundesliga, Bayern Munich, Manchester City, Inter
              Milan, AC Milan.
            </p>
          </div>

          <dl className="border-l-2 border-yellow pl-7">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex justify-between gap-5 py-3.5 border-b border-line last:border-0"
              >
                <dt className="mono text-xs text-smoke">{fact.label}</dt>
                <dd className="text-[15px] text-paper text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <LanguagesMarquee />
    </div>
  );
}
