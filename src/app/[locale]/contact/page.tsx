import { getTranslations } from "next-intl/server";
import { ContactContent } from "@/components/pages/ContactContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://sophiemartinrh.ca/${locale}/contact`,
      languages: {
        fr: "https://sophiemartinrh.ca/fr/contact",
        en: "https://sophiemartinrh.ca/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
