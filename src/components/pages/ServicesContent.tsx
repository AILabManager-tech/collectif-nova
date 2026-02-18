"use client";

import { useTranslations } from "next-intl";
import { Palette, Globe, Share2, Video } from "lucide-react";
import { GlitchText } from "@/components/interactive/GlitchText";
import { NeonBadge } from "@/components/interactive/NeonBadge";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

/* ------------------------------------------------------------------ */
/*  Service definitions                                                */
/* ------------------------------------------------------------------ */

const serviceKeys = ["branding", "web", "social", "motion"] as const;

const serviceIcons = {
  branding: Palette,
  web: Globe,
  social: Share2,
  motion: Video,
} as const;

const serviceAccents = {
  branding: "text-[#7B61FF]",
  web: "text-[#00E5CC]",
  social: "text-[#7B61FF]",
  motion: "text-[#00E5CC]",
} as const;

const serviceGradients = {
  branding: "from-[#7B61FF] to-[#00E5CC]",
  web: "from-[#00E5CC] to-[#7B61FF]",
  social: "from-[#7B61FF] via-[#00E5CC] to-[#7B61FF]",
  motion: "from-[#00E5CC] via-[#7B61FF] to-[#00E5CC]",
} as const;

const serviceItems: Record<string, readonly string[]> = {
  branding: ["item1", "item2", "item3", "item4", "item5"],
  web: ["item1", "item2", "item3", "item4"],
  social: ["item1", "item2", "item3", "item4"],
  motion: ["item1", "item2", "item3", "item4", "item5"],
};

/* ------------------------------------------------------------------ */
/*  Process step data                                                  */
/* ------------------------------------------------------------------ */

const processSteps = ["discovery", "strategy", "creation", "launch"] as const;

const processColors = [
  "text-[#7B61FF]",
  "text-[#00E5CC]",
  "text-[#7B61FF]",
  "text-[#00E5CC]",
] as const;

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ServicesContent -- Services page for Collectif Nova featuring
 * detailed service cards, a 4-step creative process section,
 * and an FAQ accordion. Full dark-mode design.
 *
 * @component
 * @example
 * ```tsx
 * <ServicesContent />
 * ```
 */
export function ServicesContent() {
  const t = useTranslations("services");

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero — dark bg with GlitchText + NeonBadge               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7B61FF]/5 via-transparent to-transparent" />
        <div className="container-narrow text-center relative z-10 section-padding">
          <AnimatedSection delay={0.1} direction="none">
            <div className="mb-6">
              <NeonBadge color="cyan" size="md">
                {t("hero.badge")}
              </NeonBadge>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="none">
            <GlitchText
              as="h1"
              intensity="low"
              className="mb-4 text-4xl text-[#F0F0F5] md:text-5xl"
            >
              {t("hero.title")}
            </GlitchText>
          </AnimatedSection>

          <AnimatedSection delay={0.4} direction="none">
            <p className="text-lg text-[#F0F0F5]/60 md:text-xl font-body">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" color="bg-[#7B61FF]" delay={0.6} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Detailed services — alternating layout                   */}
      {/* ============================================================ */}
      {serviceKeys.map((key, index) => {
        const isEven = index % 2 === 0;
        const Icon = serviceIcons[key];
        const items = serviceItems[key] ?? [];

        return (
          <section
            key={key}
            className={`section-padding relative overflow-hidden ${
              isEven ? "bg-[#0D0D0D]" : "bg-[#111118]"
            }`}
          >
            <div className="container-wide relative">
              <div className="grid items-start gap-12 md:grid-cols-2">
                {/* Text content */}
                <AnimatedSection
                  direction={isEven ? "left" : "right"}
                  className={isEven ? "" : "md:order-2"}
                >
                  {/* Large gradient number */}
                  <span
                    className={`mb-2 inline-block font-heading text-7xl font-bold bg-gradient-to-br ${serviceGradients[key]} bg-clip-text text-transparent opacity-30`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-4 flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${serviceAccents[key]}`} strokeWidth={1.5} />
                    <h2 className="font-heading text-2xl font-bold text-[#F0F0F5]">
                      {t(`${key}.title`)}
                    </h2>
                  </div>

                  <p className="mb-6 text-lg text-[#F0F0F5]/60 font-body">
                    {t(`${key}.description`)}
                  </p>

                  <StaggerGrid className="space-y-3" stagger={0.08}>
                    {items.map((item) => (
                      <div key={item} className="flex items-start gap-3 group">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#00E5CC] transition-transform group-hover:scale-125" />
                        <span className="text-[#F0F0F5]/70 font-body">
                          {t(`${key}.${item}`)}
                        </span>
                      </div>
                    ))}
                  </StaggerGrid>
                </AnimatedSection>

                {/* Visual side — gradient card */}
                <AnimatedSection
                  direction={isEven ? "right" : "left"}
                  delay={0.2}
                  className={isEven ? "" : "md:order-1"}
                >
                  <div className="relative rounded-2xl border border-[#F0F0F5]/10 bg-[#1A1A2E] p-8 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${serviceGradients[key]} opacity-5`}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center py-12">
                      <div className={`mb-4 rounded-2xl bg-[#0D0D0D]/50 p-6 ${serviceAccents[key]}`}>
                        <Icon className="h-16 w-16" strokeWidth={1} />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-[#F0F0F5]">
                        {t(`${key}.title`)}
                      </h3>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============================================================ */}
      {/*  3. Process — 4 steps with neon numbers                      */}
      {/* ============================================================ */}
      <section className="section-padding bg-[#0D0D0D]">
        <div className="container-wide">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center !text-[#F0F0F5]">
              {t("process.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-[#00E5CC]" delay={0.3} />

          <StaggerGrid className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
            {processSteps.map((step, i) => (
              <div
                key={step}
                className="group relative rounded-2xl border border-[#F0F0F5]/10 bg-[#1A1A2E] p-6 text-center transition-all duration-300 hover:border-[#7B61FF]/30 hover:shadow-[0_0_20px_rgba(123,97,255,0.1)]"
              >
                <span
                  className={`mb-3 inline-block font-heading text-5xl font-bold ${processColors[i]}`}
                  style={{
                    textShadow:
                      i % 2 === 0
                        ? "0 0 20px rgba(123, 97, 255, 0.4)"
                        : "0 0 20px rgba(0, 229, 204, 0.4)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 font-heading text-lg font-semibold text-[#F0F0F5]">
                  {t(`process.${step}.title`)}
                </h3>
                <p className="text-sm text-[#F0F0F5]/50 font-body">
                  {t(`process.${step}.description`)}
                </p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. FAQ — 6 questions via FaqAccordion                       */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-[#111118]">
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center !text-[#F0F0F5]">
              {t("faq.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-8 w-24" color="bg-[#7B61FF]" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
