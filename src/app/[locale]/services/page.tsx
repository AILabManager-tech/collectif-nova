import { getTranslations } from "next-intl/server";
import { ServicesContent } from "@/components/pages/ServicesContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://collectif-nova.vercel.app/${locale}/services`,
      languages: {
        fr: "https://collectif-nova.vercel.app/fr/services",
        en: "https://collectif-nova.vercel.app/en/services",
      },
    },
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
