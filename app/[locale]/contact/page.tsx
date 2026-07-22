import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the mmc sport desk in Munich.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero eyebrow="Contact" title="Talk to the desk." />

      <div className="max-w-[1240px] mx-auto px-8 py-16 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="mono text-xs text-smoke mb-2">General enquiries</h2>
          <a href="mailto:hello@mmcsport.de" className="text-2xl display block hover:text-yellow transition-colors">
            hello@mmcsport.de
          </a>
        </div>
        <div>
          <h2 className="mono text-xs text-smoke mb-2">Careers</h2>
          <a href="mailto:jobs@mmcsport.de" className="text-2xl display block hover:text-yellow transition-colors">
            jobs@mmcsport.de
          </a>
        </div>
        <div>
          <h2 className="mono text-xs text-smoke mb-2">Office</h2>
          <p className="text-muted text-lg">Munich, Germany</p>
        </div>
      </div>
    </div>
  );
}
