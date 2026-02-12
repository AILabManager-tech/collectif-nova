"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ContactContent() {
  const t = useTranslations("contact");

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

      {/* Form + Info */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Formulaire */}
            <AnimatedSection direction="left" className="md:col-span-3">
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-charcoal transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-charcoal transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.company")}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-charcoal transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="employees"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.employees")}
                    </label>
                    <input
                      id="employees"
                      name="employees"
                      type="text"
                      className="w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-charcoal transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="challenge"
                    className="mb-1.5 block text-sm font-medium text-charcoal"
                  >
                    {t("form.challenge")}
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={5}
                    required
                    placeholder={t("form.challenge_placeholder")}
                    className="w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-charcoal transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                  />
                </div>

                <Button type="submit" size="lg">
                  {t("form.submit")}
                </Button>

                <p className="text-sm text-taupe">{t("form.response_time")}</p>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection
              direction="right"
              delay={0.2}
              className="md:col-span-2"
            >
              <div className="rounded-xl bg-cream-400 p-8">
                <div className="space-y-6">
                  <div>
                    <p className="mb-1 text-sm font-medium text-sage-600">
                      {t("info.email_label")}
                    </p>
                    <a
                      href="mailto:info@sophiemartinrh.ca"
                      className="text-charcoal transition-colors hover:text-sage-600"
                    >
                      info@sophiemartinrh.ca
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-sage-600">
                      {t("info.location_label")}
                    </p>
                    <p className="text-charcoal">{t("info.location")}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-sage-600">
                      {t("info.linkedin")}
                    </p>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal transition-colors hover:text-sage-600"
                    >
                      Sophie Martin RH
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
