import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal disclosure for mmc sport.",
};

export default function ImprintPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Imprint" />
      <div className="max-w-[1240px] mx-auto px-8 py-16">
        <div className="max-w-[60ch]">
          <p className="text-muted text-[17px] leading-[1.7] mb-5">
            mmc sport GmbH
            <br />
            Munich, Germany
          </p>
          <p className="text-muted text-[17px] leading-[1.7] mb-5">
            Contact:{" "}
            <a href="mailto:hello@mmcsport.de" className="text-paper hover:text-yellow">
              hello@mmcsport.de
            </a>
          </p>
          <p className="text-smoke text-sm">
            Full statutory imprint details (register court, registration
            number, VAT ID, managing directors) to be added.
          </p>
        </div>
      </div>
    </div>
  );
}
