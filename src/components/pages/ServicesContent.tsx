"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TextReveal } from "@/components/animations/TextReveal";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { LineReveal } from "@/components/animations/LineReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AuroraBackground } from "@/components/animations/AuroraBackground";

const services = ["diagnostic", "implementation", "coaching"] as const;

const serviceImages = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format",
];

const serviceColors = [
  "from-sage-500 to-sage-600",
  "from-terracotta-400 to-terracotta-600",
  "from-gold-400 to-gold-600",
];

export function ServicesContent() {
  const t = useTranslations("services");
  const common = useTranslations("common");

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <main>
      {/* Hero with aurora */}
      <section className="relative section-padding flex items-center overflow-hidden">
        <AuroraBackground />
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow text-center relative z-10">
          <TextReveal className="mb-4">{t("hero.title")}</TextReveal>
          <AnimatedSection delay={0.4} direction="none">
            <p className="text-lg text-taupe md:text-xl">{t("hero.subtitle")}</p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" delay={0.6} />
        </div>
      </section>

      {services.map((key, index) => {
        const isEven = index % 2 === 0;
        const items =
          key === "diagnostic"
            ? (["item1", "item2", "item3"] as const)
            : (["item1", "item2", "item3", "item4"] as const);

        return (
          <section key={key} className={`section-padding relative overflow-hidden ${isEven ? "" : "bg-cream-300/50"}`}>
            {!isEven && <div className="absolute inset-0 gradient-mesh-bg" />}
            <div className="container-wide relative">
              <div className="grid items-start gap-12 md:grid-cols-2">
                <AnimatedSection direction={isEven ? "left" : "right"} className={isEven ? "" : "md:order-2"}>
                  <span className={`mb-2 inline-block font-heading text-7xl font-bold bg-gradient-to-br ${serviceColors[index]} bg-clip-text text-transparent opacity-40`}>
                    {index + 1}
                  </span>
                  <h2 className="mb-3">{t(`${key}.title`)}</h2>
                  <p className="mb-6 text-lg text-taupe">{t(`${key}.description`)}</p>
                  <h3 className="mb-3 text-sage-600">{t(`${key}.includes`)}</h3>
                  <StaggerGrid className="space-y-3" stagger={0.08}>
                    {items.map((item) => (
                      <div key={item} className="flex items-start gap-3 group">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-sage-400 to-terracotta-400 transition-transform group-hover:scale-125" />
                        <span className="text-taupe">{t(`${key}.${item}`)}</span>
                      </div>
                    ))}
                  </StaggerGrid>
                </AnimatedSection>
                <AnimatedSection direction={isEven ? "right" : "left"} delay={0.2} className={isEven ? "" : "md:order-1"}>
                  <div className="space-y-6">
                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={serviceImages[index] ?? ""}
                        alt={t(`${key}.title`)}
                        width={600}
                        height={400}
                        className="object-cover w-full h-[280px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/40 to-transparent" />
                    </div>
                    {/* Info card */}
                    <div className="card-elevated">
                      <div className="mb-4 flex items-center gap-2 text-sm text-sage-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{common("duration")} : {t(`${key}.duration`)}</span>
                      </div>
                      <LineReveal className="mb-4 w-12" delay={0.4} />
                      <p className="font-heading text-lg font-medium text-charcoal">{t(`${key}.result`)}</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      <div className="section-divider" />

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">{t("faq.title")}</TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-8 w-24" color="bg-sage-400" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
