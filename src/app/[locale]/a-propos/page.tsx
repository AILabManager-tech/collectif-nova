import { getTranslations } from "next-intl/server";
import { AboutContent } from "@/components/pages/AboutContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://sophiemartinrh.ca/${locale}/a-propos`,
      languages: {
        fr: "https://sophiemartinrh.ca/fr/a-propos",
        en: "https://sophiemartinrh.ca/en/a-propos",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
