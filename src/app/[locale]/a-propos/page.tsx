import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

const values = ["empathy", "transparency", "autonomy"] as const;

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
  const t = useTranslations("about");

  return (
    <main>
      {/* Hero */}
      <section className="section-padding flex items-center bg-cream-400">
        <div className="container-narrow text-center">
          <AnimatedSection direction="none">
            <h1 className="mb-4">{t("hero.title")}</h1>
            <p className="text-lg text-taupe md:text-xl">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <h2 className="mb-8">{t("story.title")}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="space-y-5 text-lg leading-relaxed text-taupe">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-cream-400">
        <div className="container-narrow">
          <AnimatedSection>
            <h2 className="mb-6">{t("philosophy.title")}</h2>
            <p className="text-lg leading-relaxed text-taupe">
              {t("philosophy.p1")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.15}>
                <div className="rounded-xl border border-cream-400 p-8 text-center transition-shadow hover:shadow-md">
                  <h3 className="mb-3 text-sage-600">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-taupe">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
