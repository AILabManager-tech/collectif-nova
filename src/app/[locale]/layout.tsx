import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Oswald, Barlow } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/interactive/ChatWidget";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import "../globals.css";

// NEXOS: Typographie industrielle — HR Factory / L'Usine RH
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://hrfactory.ca"),
    title: {
      default: t("title"),
      template: "%s | HR Factory / L'Usine RH",
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      siteName: "HR Factory / L'Usine RH",
    },
    alternates: {
      canonical: `https://hrfactory.ca/${locale}`,
      languages: {
        fr: "https://hrfactory.ca/fr",
        en: "https://hrfactory.ca/en",
      },
    },
  };
}

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${oswald.variable} ${barlow.variable}`}>
      <body className="font-body bg-cream-200 text-charcoal antialiased">
        <JsonLd data={localBusinessSchema} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
