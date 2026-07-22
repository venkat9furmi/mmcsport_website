import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Anton, Archivo, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mmcsport.de"),
  title: {
    default: "mmc sport — Built for football. Built for speed. Built for languages.",
    template: "%s — mmc sport",
  },
  description:
    "The multilingual newsroom behind Europe's biggest football brands. Live commentary, social, artwork and community — published natively, in every market, at match tempo.",
  openGraph: {
    title: "mmc sport",
    description:
      "The multilingual newsroom behind Europe's biggest football brands.",
    siteName: "mmc sport",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${anton.variable} ${archivo.variable} ${robotoMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ink text-paper">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`,
          }}
        />
        <Nav locale={locale as Locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
