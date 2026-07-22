import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the desk: journalists, translators, commentators, designers and community managers working across 20+ languages.",
};

const ROLES = [
  "Match commentators, native speakers of any of our 20+ markets",
  "Social editors who can write for a platform, not just translate onto it",
  "Community managers comfortable moderating at matchday pace",
  "Designers who can adapt a key visual for a market, not just resize it",
];

export default function CareersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title="Work on the desk."
        lede="We're always looking for journalists, translators, commentators and designers who want to work on live football, in their own language."
      />

      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <h2 className="display text-2xl mb-6">What we're usually hiring for</h2>
        <ul className="list-slash max-w-[60ch]">
          {ROLES.map((role) => (
            <li key={role} className="text-muted text-[16px] py-2">
              {role}
            </li>
          ))}
        </ul>

        <p className="text-muted text-lg mt-10 max-w-[60ch]">
          Don&apos;t see your market or role listed? Send us what you do and
          the languages you cover — we hire ahead of open roles when the
          right editor comes along.
        </p>

        <a
          href="mailto:jobs@mmcsport.de"
          className="inline-block mt-8 px-[30px] py-4 font-semibold text-[14px] tracking-[0.08em] uppercase bg-yellow text-black hover:bg-white transition-colors"
        >
          jobs@mmcsport.de
        </a>
      </div>
    </div>
  );
}
