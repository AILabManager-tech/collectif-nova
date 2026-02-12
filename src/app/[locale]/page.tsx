import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main>
      {/* Hero */}
      <section className="section-padding flex min-h-[80vh] items-center">
        <div className="container-wide">
          <AnimatedSection direction="none">
            <div className="max-w-2xl">
              <h1 className="mb-6">{t("hero.title")}</h1>
              <p className="mb-8 text-lg text-taupe md:text-xl">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" size="lg">
                  {t("hero.cta")}
                </Button>
                <Button href="#services" variant="outline" size="lg">
                  {t("hero.cta_secondary")}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding bg-cream-400">
        <div className="container-wide">
          <AnimatedSection>
            <h2 className="mb-12 text-center">{t("pain.title")}</h2>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-3">
            {(["owner", "manager", "growing"] as const).map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.15}>
                <div className="rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="mb-3 text-sage-600">
                    {t(`pain.${key}.title`)}
                  </h3>
                  <p className="text-taupe">{t(`pain.${key}.description`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="section-padding">
        <div className="container-wide">
          <AnimatedSection>
            <h2 className="mb-12 text-center">{t("services.title")}</h2>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-3">
            {(["diagnostic", "implementation", "coaching"] as const).map(
              (key, index) => (
                <AnimatedSection key={key} delay={index * 0.15}>
                  <div className="relative pl-8">
                    <span className="absolute left-0 top-0 font-heading text-4xl font-bold text-sage-200">
                      {index + 1}
                    </span>
                    <h3 className="mb-3">{t(`services.${key}.title`)}</h3>
                    <p className="text-taupe">
                      {t(`services.${key}.description`)}
                    </p>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="section-padding bg-cream-400">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="mb-12">{t("testimonials.title")}</h2>
            <p className="text-taupe italic">
              &ldquo;Témoignages à venir&rdquo;
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="section-padding">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="mb-4">{t("cta_final.title")}</h2>
            <p className="mb-8 text-lg text-taupe">
              {t("cta_final.subtitle")}
            </p>
            <Button href="/contact" size="lg">
              {t("cta_final.button")}
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
