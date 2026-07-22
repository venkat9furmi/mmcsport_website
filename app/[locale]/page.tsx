import { isLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Hero from "@/components/home/Hero";
import Desk from "@/components/Desk";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import LanguagesMarquee from "@/components/home/LanguagesMarquee";
import Work from "@/components/home/Work";
import Newsroom from "@/components/home/Newsroom";
import About from "@/components/home/About";
import DemoSection from "@/components/home/DemoSection";
import RevealObserver from "@/components/RevealObserver";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <>
      <Hero locale={loc} />
      <Desk />
      <Stats />
      <Services locale={loc} />
      <LanguagesMarquee />
      <Work />
      <Newsroom locale={loc} />
      <About />
      <DemoSection />
      <RevealObserver />
    </>
  );
}
