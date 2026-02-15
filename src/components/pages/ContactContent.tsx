"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AuroraBackground } from "@/components/animations/AuroraBackground";

export function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80&auto=format"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-image-overlay" />
        <AuroraBackground />
        <div className="container-narrow text-center relative z-10 section-padding">
          <AnimatedSection direction="none">
            <h1 className="mb-4 !text-white">{t("hero.title")}</h1>
            <p className="text-lg text-cream-300/90 md:text-xl">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Formulaire */}
            <AnimatedSection direction="left" className="md:col-span-3">
              <form
                className="card-elevated space-y-5"
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
                      className="w-full rounded-xl border border-cream-400 bg-white/80 px-4 py-3 text-charcoal transition-all focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:bg-white"
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
                      className="w-full rounded-xl border border-cream-400 bg-white/80 px-4 py-3 text-charcoal transition-all focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:bg-white"
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
                      className="w-full rounded-xl border border-cream-400 bg-white/80 px-4 py-3 text-charcoal transition-all focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:bg-white"
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
                      className="w-full rounded-xl border border-cream-400 bg-white/80 px-4 py-3 text-charcoal transition-all focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:bg-white"
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
                    className="w-full rounded-xl border border-cream-400 bg-white/80 px-4 py-3 text-charcoal transition-all focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:bg-white"
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
              <div className="card-elevated !bg-sage-600 !border-sage-700 text-white">
                <h3 className="mb-6 text-cream-100 text-xl">Prenons contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-sage-200 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-sage-200">
                        {t("info.email_label")}
                      </p>
                      <a
                        href="mailto:info@emiliepoirierrh.ca"
                        className="text-cream-100 transition-colors hover:text-white"
                      >
                        info@emiliepoirierrh.ca
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-sage-200 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-sage-200">
                        {t("info.location_label")}
                      </p>
                      <p className="text-cream-100">{t("info.location")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-sage-200 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-sage-200">
                        {t("info.linkedin")}
                      </p>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream-100 transition-colors hover:text-white"
                      >
                        {locale === "fr" ? "L'Usine RH" : "HR Factory"}
                      </a>
                    </div>
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
