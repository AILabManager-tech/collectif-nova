"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb, Fingerprint, Zap } from "lucide-react";
import { GlitchText } from "@/components/interactive/GlitchText";
import { NeonBadge } from "@/components/interactive/NeonBadge";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/* ------------------------------------------------------------------ */
/*  Values data                                                        */
/* ------------------------------------------------------------------ */

const values = [
  { key: "innovation", Icon: Lightbulb, accent: "violet" },
  { key: "authenticity", Icon: Fingerprint, accent: "cyan" },
  { key: "impact", Icon: Zap, accent: "violet" },
] as const;

const valueAccents: Record<string, { icon: string; border: string; glow: string }> = {
  violet: {
    icon: "text-[#7B61FF]",
    border: "border-[#7B61FF]/20 hover:border-[#7B61FF]/40",
    glow: "hover:shadow-[0_0_25px_rgba(123,97,255,0.15)]",
  },
  cyan: {
    icon: "text-[#00E5CC]",
    border: "border-[#00E5CC]/20 hover:border-[#00E5CC]/40",
    glow: "hover:shadow-[0_0_25px_rgba(0,229,204,0.15)]",
  },
};

/* ------------------------------------------------------------------ */
/*  Team data                                                          */
/* ------------------------------------------------------------------ */

const teamMembers = [
  { key: "alex", initials: "AM", color: "bg-[#7B61FF]" },
  { key: "sam", initials: "SC", color: "bg-[#00E5CC]" },
  { key: "jules", initials: "JF", color: "bg-[#7B61FF]" },
] as const;

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * AboutContent -- About page for Collectif Nova featuring the
 * agency story, core values, team members, and a CTA to contact.
 * Full dark-mode design with violet/cyan accents.
 *
 * @component
 * @example
 * ```tsx
 * <AboutContent />
 * ```
 */
export function AboutContent() {
  const t = useTranslations("about");
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero — dark bg with GlitchText + NeonBadge               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-[#0D0D0D]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7B61FF]/5 via-transparent to-transparent" />
        <div className="container-narrow text-center relative z-10 section-padding">
          <AnimatedSection delay={0.1} direction="none">
            <div className="mb-6">
              <NeonBadge color="violet" size="md">
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
          <LineReveal className="mx-auto mt-8 w-24" color="bg-[#00E5CC]" delay={0.6} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Story — Vision + design philosophy                       */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-[#0D0D0D]">
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 !text-[#F0F0F5]">
              {t("story.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mb-8 w-16" color="bg-[#7B61FF]" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <div className="space-y-5 text-lg leading-relaxed text-[#F0F0F5]/70 font-body">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. Values — 3 cards with icons                              */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-[#111118]">
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center !text-[#F0F0F5]">
              {t("values.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-[#00E5CC]" delay={0.3} />

          <StaggerGrid className="grid gap-6 md:grid-cols-3" stagger={0.12}>
            {values.map(({ key, Icon, accent }) => {
              const colors = valueAccents[accent] ?? { icon: "text-[#7B61FF]", border: "border-[#7B61FF]/20 hover:border-[#7B61FF]/40", glow: "hover:shadow-[0_0_25px_rgba(123,97,255,0.15)]" };
              return (
                <motion.div
                  key={key}
                  initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeInOut" as const }}
                  className={`rounded-2xl border bg-[#1A1A2E] p-8 transition-all duration-300 ${colors.border} ${colors.glow}`}
                >
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0D0D0D]/50 ${colors.icon}`}>
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-[#F0F0F5]">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-[#F0F0F5]/60 leading-relaxed font-body">
                    {t(`values.${key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. Team — 3 members                                         */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-[#0D0D0D]">
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center !text-[#F0F0F5]">
              {t("team.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.2} direction="none">
            <p className="mx-auto mb-4 max-w-xl text-center text-lg text-[#F0F0F5]/60 font-body">
              {t("team.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-[#7B61FF]" delay={0.3} />

          <StaggerGrid className="grid gap-8 md:grid-cols-3" stagger={0.15}>
            {teamMembers.map(({ key, initials, color }) => (
              <motion.div
                key={key}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" as const }}
                className="group rounded-2xl border border-[#F0F0F5]/10 bg-[#1A1A2E] p-8 text-center transition-all duration-300 hover:border-[#7B61FF]/30 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)]"
              >
                {/* Avatar placeholder */}
                <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${color} text-white font-heading text-2xl font-bold shadow-lg`}>
                  {initials}
                </div>
                <h3 className="mb-1 font-heading text-xl font-semibold text-[#F0F0F5]">
                  {t(`team.${key}.name`)}
                </h3>
                <p className="mb-3 text-sm text-[#7B61FF] font-medium">
                  {t(`team.${key}.role`)}
                </p>
                <p className="text-sm text-[#F0F0F5]/50 leading-relaxed font-body">
                  {t(`team.${key}.bio`)}
                </p>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. CTA — Join the adventure                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00E5CC]" />
        <div className="absolute inset-0 bg-[#0D0D0D]/30" />
        <div className="container-narrow relative z-10 text-center section-padding">
          <AnimatedSection>
            <GlitchText
              as="h2"
              intensity="low"
              className="mb-4 text-3xl text-white md:text-5xl"
            >
              {t("cta.title")}
            </GlitchText>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 text-lg text-white/80 font-body">
              {t("cta.subtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-5 text-lg font-medium text-[#0D0D0D] transition-all hover:bg-[#F0F0F5] hover:shadow-xl hover:shadow-white/25"
              strength={0.4}
            >
              {t("cta.button")}
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
