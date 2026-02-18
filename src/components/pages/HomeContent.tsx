"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Palette, Globe, Share2, Video } from "lucide-react";
import { GlitchText } from "@/components/interactive/GlitchText";
import { NeonBadge } from "@/components/interactive/NeonBadge";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { CountUp } from "@/components/animations/CountUp";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const ParticleCanvas = dynamic(
  () => import("@/components/interactive/ParticleCanvas").then((m) => ({ default: m.ParticleCanvas })),
  { ssr: false, loading: () => null }
);

const ProjectShowcase3D = dynamic(
  () => import("@/components/interactive/ProjectShowcase3D").then((m) => ({ default: m.ProjectShowcase3D })),
  { ssr: false, loading: () => <div className="bg-[#0D0D0D] py-16 lg:py-24" /> }
);

/* ------------------------------------------------------------------ */
/*  Service card data                                                  */
/* ------------------------------------------------------------------ */

const services = [
  { key: "branding", Icon: Palette, accent: "violet" },
  { key: "web", Icon: Globe, accent: "cyan" },
  { key: "social", Icon: Share2, accent: "violet" },
  { key: "motion", Icon: Video, accent: "cyan" },
] as const;

const accentMap: Record<string, { bg: string; text: string; border: string }> = {
  violet: {
    bg: "bg-[#7B61FF]/10",
    text: "text-[#7B61FF]",
    border: "border-[#7B61FF]/20",
  },
  cyan: {
    bg: "bg-[#00E5CC]/10",
    text: "text-[#00E5CC]",
    border: "border-[#00E5CC]/20",
  },
};

/* ------------------------------------------------------------------ */
/*  Testimonial card                                                   */
/* ------------------------------------------------------------------ */

interface TestimonialCardProps {
  index: number;
  prefersReduced: boolean;
}

function TestimonialCard({ index, prefersReduced }: TestimonialCardProps) {
  const t = useTranslations("home.testimonials");

  return (
    <motion.blockquote
      initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeInOut" as const }}
      className="flex flex-col rounded-2xl border border-[#F0F0F5]/10 bg-[#1A1A2E] p-6"
    >
      {/* Stars */}
      <div className="mb-4 flex gap-1 text-[#7B61FF]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="mb-6 flex-1 text-[#F0F0F5]/80 leading-relaxed italic">
        &ldquo;{t(`${index}.quote`)}&rdquo;
      </p>

      <footer className="flex items-center gap-3 border-t border-[#F0F0F5]/10 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7B61FF]/20 font-heading text-sm font-bold text-[#7B61FF]">
          {t(`${index}.name`).charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-[#F0F0F5]">{t(`${index}.name`)}</p>
          <p className="text-xs text-[#F0F0F5]/70">{t(`${index}.role`)}</p>
        </div>
      </footer>
    </motion.blockquote>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * HomeContent -- Landing page for Collectif Nova featuring a dark-mode
 * hero with particle canvas, glitch text, service cards, 3D project
 * showcase, testimonials, and a gradient CTA section.
 *
 * @component
 * @example
 * ```tsx
 * <HomeContent />
 * ```
 */
export function HomeContent() {
  const t = useTranslations("home");
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero — DARK bg with ParticleCanvas + GlitchText          */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0D0D0D]">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]/80" />

        <div className="container-wide relative z-10 section-padding">
          <div className="max-w-2xl">
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
                intensity="medium"
                className="mb-6 text-4xl text-[#F0F0F5] md:text-6xl lg:text-7xl"
              >
                {t("hero.title")}
              </GlitchText>
            </AnimatedSection>

            <AnimatedSection delay={0.6} direction="none">
              <p className="mb-10 text-lg text-[#F0F0F5]/70 md:text-xl leading-relaxed font-body">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.9} direction="none">
              <div className="flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[#7B61FF] px-8 py-4 text-lg font-medium text-white transition-all hover:bg-[#6B51EF] hover:shadow-xl hover:shadow-[#7B61FF]/25"
                  strength={0.35}
                >
                  {t("hero.cta")}
                </MagneticButton>
                <MagneticButton
                  href="#project-showcase"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#00E5CC]/40 px-8 py-4 text-lg font-medium text-[#00E5CC] backdrop-blur-sm transition-all hover:bg-[#00E5CC]/10 hover:border-[#00E5CC]/60"
                  strength={0.25}
                >
                  {t("hero.cta_secondary")}
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>

          {/* Floating elements -- right side */}
          <div className="pointer-events-none absolute right-0 top-1/4 hidden lg:block">
            <FloatingElement amplitude={15} duration={7}>
              <div className="h-20 w-20 rounded-2xl border border-[#7B61FF]/20 bg-[#7B61FF]/5 backdrop-blur-md" />
            </FloatingElement>
            <FloatingElement amplitude={10} duration={5} delay={1} className="ml-24 mt-8">
              <div className="h-12 w-12 rounded-xl border border-[#00E5CC]/20 bg-[#00E5CC]/10 backdrop-blur-sm" />
            </FloatingElement>
            <FloatingElement amplitude={18} duration={8} delay={2} className="-ml-8 mt-6">
              <div className="h-16 w-16 rounded-full border border-[#F0F0F5]/10 bg-[#F0F0F5]/5 backdrop-blur-sm" />
            </FloatingElement>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  2. Stats — glassmorphism bar                                */}
      {/* ============================================================ */}
      <section className="relative -mt-16 z-20">
        <div className="container-wide px-6">
          <div className="rounded-2xl border border-[#F0F0F5]/10 bg-[#1A1A2E]/80 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(123,97,255,0.1)]">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div>
                <p className="font-heading text-3xl font-bold text-[#7B61FF] md:text-4xl">
                  <CountUp to={12} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-[#F0F0F5]/70">{t("stats.experience")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-[#00E5CC] md:text-4xl">
                  <CountUp to={200} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-[#F0F0F5]/70">{t("stats.projects")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-[#7B61FF] md:text-4xl">
                  <CountUp to={95} suffix="%" />
                </p>
                <p className="mt-1 text-sm text-[#F0F0F5]/70">{t("stats.satisfaction")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-[#00E5CC] md:text-4xl">
                  <CountUp to={4} />
                </p>
                <p className="mt-1 text-sm text-[#F0F0F5]/70">{t("stats.expertises")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. Services overview — 4 cards                              */}
      {/* ============================================================ */}
      <section id="services" className="section-padding relative overflow-hidden bg-[#0D0D0D]">
        <div className="container-wide relative">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center !text-[#F0F0F5]">
              {t("services.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.2} direction="none">
            <p className="mx-auto mb-4 max-w-xl text-center text-lg text-[#F0F0F5]/70 font-body">
              {t("services.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-[#7B61FF]" delay={0.3} />

          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {services.map(({ key, Icon, accent }) => {
              const colors = accentMap[accent] ?? { bg: "bg-[#7B61FF]/10", text: "text-[#7B61FF]", border: "border-[#7B61FF]/20" };
              return (
                <Link
                  key={key}
                  href="/services"
                  className="group flex flex-col items-start rounded-2xl border border-[#F0F0F5]/10 bg-[#1A1A2E] p-6 transition-all duration-300 hover:border-[#7B61FF]/40 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]"
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-colors`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className={`mb-2 font-heading text-lg font-semibold ${colors.text} transition-colors`}>
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[#F0F0F5]/70 leading-relaxed font-body">
                    {t(`services.${key}.description`)}
                  </p>
                </Link>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. ProjectShowcase3D — Interactive portfolio                 */}
      {/* ============================================================ */}
      <ProjectShowcase3D />

      {/* ============================================================ */}
      {/*  5. Testimonials — 3 client reviews                          */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-[#0D0D0D]">
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center !text-[#F0F0F5]">
              {t("testimonials.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-[#00E5CC]" delay={0.3} />

          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <TestimonialCard
                key={i}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. CTA Final — gradient violet->cyan                        */}
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
              {t("cta_final.title")}
            </GlitchText>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 text-lg text-white/80 font-body">
              {t("cta_final.subtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-5 text-lg font-medium text-[#0D0D0D] transition-all hover:bg-[#F0F0F5] hover:shadow-xl hover:shadow-white/25"
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
