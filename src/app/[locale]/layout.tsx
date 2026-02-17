import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Oswald, Barlow } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientWidgets } from "@/components/layout/ClientWidgets";
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
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://emiliepoirierrh.ca"),
    title: {
      default: t("title"),
      template: "%s | HR Factory / L'Usine RH",
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      siteName: "L'Usine RH",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `https://emiliepoirierrh.ca/${locale}`,
      languages: {
        fr: "https://emiliepoirierrh.ca/fr",
        en: "https://emiliepoirierrh.ca/en",
      },
    },
    themeColor: "#5a7a64",
    icons: { icon: "/favicon.ico" },
  };
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${oswald.variable} ${barlow.variable}`}>
      <body className="font-body bg-cream-200 text-charcoal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-sage-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd data={localBusinessSchema} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div id="main-content" className="min-h-screen">{children}</div>
          <Footer />
          <ClientWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
