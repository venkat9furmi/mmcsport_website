import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How mmc sport handles personal data.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Privacy" />
      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="max-w-[60ch]">
          <p className="text-muted text-[17px] leading-[1.7] mb-5">
            We collect the information you submit through our demo request
            form — name, organisation, work email, market and brief — solely
            to respond to your enquiry. We don&apos;t sell or share this data
            with third parties.
          </p>
          <p className="text-muted text-[17px] leading-[1.7] mb-5">
            For questions about your data, contact{" "}
            <a href="mailto:hello@mmcsport.de" className="text-paper hover:text-yellow">
              hello@mmcsport.de
            </a>
            .
          </p>
          <p className="text-smoke text-sm">
            Full GDPR-compliant privacy policy to be added.
          </p>
        </div>
      </div>
    </div>
  );
}
