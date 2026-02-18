import { getTranslations } from "next-intl/server";
import { LazyContactContent } from "@/components/pages/LazyContactContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://collectif-nova.vercel.app/${locale}/contact`,
      languages: {
        fr: "https://collectif-nova.vercel.app/fr/contact",
        en: "https://collectif-nova.vercel.app/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <LazyContactContent />;
}
