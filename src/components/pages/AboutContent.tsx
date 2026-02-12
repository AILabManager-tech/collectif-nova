"use client";

import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/animations/TextReveal";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { LineReveal } from "@/components/animations/LineReveal";
import { CountUp } from "@/components/animations/CountUp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const values = ["empathy", "transparency", "autonomy"] as const;

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <main>
      <section className="section-padding flex items-center bg-cream-400">
        <div className="container-narrow text-center">
          <TextReveal className="mb-4">{t("hero.title")}</TextReveal>
          <AnimatedSection delay={0.4} direction="none">
            <p className="text-lg text-taupe md:text-xl">{t("hero.subtitle")}</p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" delay={0.6} />
        </div>
      </section>

      <section className="border-b border-cream-400 bg-white/50 backdrop-blur-sm">
        <div className="container-wide py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-heading text-3xl font-bold text-sage-600 md:text-4xl">
                <CountUp to={12} suffix=" ans" />
              </p>
              <p className="mt-1 text-sm text-taupe">Direction RH</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-terracotta-500 md:text-4xl">
                <CountUp to={3} suffix=" ans" />
              </p>
              <p className="mt-1 text-sm text-taupe">Consultante PME</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-gold-600 md:text-4xl">
                <CountUp to={100} suffix="%" />
              </p>
              <p className="mt-1 text-sm text-taupe">Autonomie visée</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4">{t("story.title")}</TextReveal>
          </AnimatedSection>
          <LineReveal className="mb-8 w-16" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <div className="space-y-5 text-lg leading-relaxed text-taupe">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-cream-400">
        <div className="container-narrow">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4">{t("philosophy.title")}</TextReveal>
          </AnimatedSection>
          <LineReveal className="mb-6 w-16" color="bg-sage-400" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <p className="text-lg leading-relaxed text-taupe">{t("philosophy.p1")}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <StaggerGrid className="grid gap-8 md:grid-cols-3" stagger={0.15}>
            {values.map((key) => (
              <div key={key} className="group rounded-xl border border-cream-400 p-8 text-center transition-all duration-300 hover:border-sage-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="mb-3 text-sage-600 transition-colors group-hover:text-terracotta-500">{t(`values.${key}.title`)}</h3>
                <LineReveal className="mx-auto mb-4 w-12" delay={0.2} />
                <p className="text-taupe">{t(`values.${key}.description`)}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </main>
  );
}
