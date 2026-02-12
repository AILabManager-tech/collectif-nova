import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd, buildServiceSchema, buildFaqSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

const services = ["diagnostic", "implementation", "coaching"] as const;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://sophiemartinrh.ca/${locale}/services`,
      languages: {
        fr: "https://sophiemartinrh.ca/fr/services",
        en: "https://sophiemartinrh.ca/en/services",
      },
    },
  };
}

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("services");
  const common = useTranslations("common");

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <main>
      <JsonLd data={buildServiceSchema(locale)} />
      <JsonLd data={buildFaqSchema(faqItems)} />
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

      {/* Services détaillés */}
      {services.map((key, index) => {
        const isEven = index % 2 === 0;
        const items =
          key === "diagnostic"
            ? (["item1", "item2", "item3"] as const)
            : (["item1", "item2", "item3", "item4"] as const);

        return (
          <section
            key={key}
            className={`section-padding ${isEven ? "" : "bg-cream-400"}`}
          >
            <div className="container-wide">
              <div className="grid items-start gap-12 md:grid-cols-2">
                {/* Texte */}
                <AnimatedSection
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "" : "md:order-2"}
                >
                  <span className="mb-2 inline-block font-heading text-5xl font-bold text-sage-200">
                    {index + 1}
                  </span>
                  <h2 className="mb-3">{t(`${key}.title`)}</h2>
                  <p className="mb-6 text-lg text-taupe">
                    {t(`${key}.description`)}
                  </p>

                  <h3 className="mb-3 text-sage-600">{t(`${key}.includes`)}</h3>
                  <ul className="mb-6 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terracotta-400" />
                        <span className="text-taupe">
                          {t(`${key}.${item}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>

                {/* Carte résultat */}
                <AnimatedSection
                  direction={isEven ? "right" : "left"}
                  delay={0.2}
                  className={isEven ? "" : "md:order-1"}
                >
                  <div className="rounded-xl bg-white p-8 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-sm text-sage-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {common("duration")} : {t(`${key}.duration`)}
                      </span>
                    </div>
                    <p className="font-heading text-lg font-medium text-charcoal">
                      {t(`${key}.result`)}
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <h2 className="mb-8 text-center">{t("faq.title")}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
