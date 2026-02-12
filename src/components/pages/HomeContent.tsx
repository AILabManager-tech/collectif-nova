"use client";

import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { CountUp } from "@/components/animations/CountUp";
import { LineReveal } from "@/components/animations/LineReveal";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ScrollTimeline } from "@/components/interactive/ScrollTimeline";
import { DiagnosticQuiz } from "@/components/interactive/DiagnosticQuiz";
import { CostCalculator } from "@/components/interactive/CostCalculator";
import { FlipCards } from "@/components/interactive/FlipCards";
import { TestimonialsCarousel } from "@/components/interactive/TestimonialsCarousel";
import { StaggerGrid } from "@/components/animations/StaggerGrid";

export function HomeContent() {
  const t = useTranslations("home");

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <AuroraBackground />
        <div className="container-wide relative z-10 section-padding">
          <div className="max-w-2xl">
            <TextReveal className="mb-6" delay={0.2}>
              {t("hero.title")}
            </TextReveal>
            <AnimatedSection delay={0.6} direction="none">
              <p className="mb-10 text-lg text-taupe md:text-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.9} direction="none">
              <div className="flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-terracotta-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-terracotta-600"
                  strength={0.35}
                >
                  {t("hero.cta")}
                </MagneticButton>
                <MagneticButton
                  href="#services"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-sage-500 px-8 py-4 text-lg font-medium text-sage-600 transition-colors hover:bg-sage-50"
                  strength={0.25}
                >
                  {t("hero.cta_secondary")}
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>
          <div className="pointer-events-none absolute right-0 top-1/4 hidden lg:block">
            <FloatingElement amplitude={15} duration={7}>
              <div className="h-20 w-20 rounded-2xl bg-sage-300/20 backdrop-blur-sm" />
            </FloatingElement>
            <FloatingElement amplitude={10} duration={5} delay={1} className="ml-24 mt-8">
              <div className="h-12 w-12 rounded-xl bg-terracotta-300/20 backdrop-blur-sm" />
            </FloatingElement>
            <FloatingElement amplitude={18} duration={8} delay={2} className="-ml-8 mt-6">
              <div className="h-16 w-16 rounded-full bg-gold-300/15 backdrop-blur-sm" />
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-cream-400 bg-white/50 backdrop-blur-sm">
        <div className="container-wide py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-heading text-3xl font-bold text-sage-600 md:text-4xl">
                <CountUp to={12} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-taupe">{t("stats.experience")}</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-terracotta-500 md:text-4xl">
                <CountUp to={50} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-taupe">{t("stats.clients")}</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-gold-600 md:text-4xl">
                <CountUp to={15} suffix="-50" />
              </p>
              <p className="mt-1 text-sm text-taupe">{t("stats.employees")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding bg-cream-400">
        <div className="container-wide">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("pain.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" delay={0.3} />
          <StaggerGrid className="grid gap-8 md:grid-cols-3" stagger={0.15}>
            {(["owner", "manager", "growing"] as const).map((key) => (
              <div key={key} className="group rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="mb-3 text-sage-600 transition-colors group-hover:text-terracotta-500">
                  {t(`pain.${key}.title`)}
                </h3>
                <p className="text-taupe">{t(`pain.${key}.description`)}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Services Timeline */}
      <ScrollTimeline />

      {/* Diagnostic Quiz */}
      <DiagnosticQuiz />

      {/* Cost Calculator */}
      <CostCalculator />

      {/* Myths Flip Cards */}
      <FlipCards />

      {/* Testimonials Before/After */}
      <TestimonialsCarousel />

      {/* Final CTA */}
      <section id="contact" className="relative overflow-hidden section-padding">
        <AuroraBackground />
        <div className="container-narrow relative z-10 text-center">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4">
              {t("cta_final.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 text-lg text-taupe">{t("cta_final.subtitle")}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-terracotta-500 px-10 py-5 text-lg font-medium text-white transition-colors hover:bg-terracotta-600"
              strength={0.4}
            >
              {t("cta_final.button")}
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
