"use client";

import Image from "next/image";
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

const painIcons = [
  <svg key="owner" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  <svg key="manager" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="growing" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-.001m5.94.001v5.942" /></svg>,
];

export function HomeContent() {
  const t = useTranslations("home");

  return (
    <main>
      {/* Hero — full screen with background image */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* NEXOS: Background image — factory workers team camaraderie */}
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80&auto=format"
          alt="Équipe d'ouvriers heureux collaborant en usine"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-image-overlay" />
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        {/* Aurora blobs on top */}
        <AuroraBackground />

        <div className="container-wide relative z-10 section-padding">
          <div className="max-w-2xl">
            <AnimatedSection delay={0.1} direction="none">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-sage-400 animate-glow-pulse" />
                <span className="text-sm font-medium text-cream-300">Consultante RH pour PME</span>
              </div>
            </AnimatedSection>
            <TextReveal className="mb-6 !text-white" delay={0.2}>
              {t("hero.title")}
            </TextReveal>
            <AnimatedSection delay={0.6} direction="none">
              <p className="mb-10 text-lg text-cream-300/90 md:text-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.9} direction="none">
              <div className="flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-terracotta-500 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-terracotta-600 hover:shadow-xl hover:shadow-terracotta-500/25"
                  strength={0.35}
                >
                  {t("hero.cta")}
                </MagneticButton>
                <MagneticButton
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
                  strength={0.25}
                >
                  {t("hero.cta_secondary")}
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>

          {/* Floating elements — right side */}
          <div className="pointer-events-none absolute right-0 top-1/4 hidden lg:block">
            <FloatingElement amplitude={15} duration={7}>
              <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />
            </FloatingElement>
            <FloatingElement amplitude={10} duration={5} delay={1} className="ml-24 mt-8">
              <div className="h-12 w-12 rounded-xl border border-terracotta-400/20 bg-terracotta-500/10 backdrop-blur-sm" />
            </FloatingElement>
            <FloatingElement amplitude={18} duration={8} delay={2} className="-ml-8 mt-6">
              <div className="h-16 w-16 rounded-full border border-gold-400/15 bg-gold-400/10 backdrop-blur-sm" />
            </FloatingElement>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-200 to-transparent" />
      </section>

      {/* Stats — glassmorphism bar */}
      <section className="relative -mt-16 z-20">
        <div className="container-wide px-6">
          <div className="glass rounded-2xl p-8 glow-sage">
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
        </div>
      </section>

      {/* Pain Points — with icons, gradient borders, image side */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("pain.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-6 w-24" delay={0.3} />

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Cards */}
            <StaggerGrid className="grid gap-5" stagger={0.15}>
              {(["owner", "manager", "growing"] as const).map((key, i) => (
                <div key={key} className="group relative rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-white/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-sage-200/50">
                  <div className="absolute -left-px top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-sage-400 via-terracotta-400 to-gold-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-sage-50 text-sage-600 transition-colors group-hover:bg-terracotta-50 group-hover:text-terracotta-500">
                      {painIcons[i]}
                    </div>
                    <div>
                      <h3 className="text-lg mb-1 text-sage-700 transition-colors group-hover:text-terracotta-500">
                        {t(`pain.${key}.title`)}
                      </h3>
                      <p className="text-taupe text-sm leading-relaxed">{t(`pain.${key}.description`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerGrid>

            {/* NEXOS: Image side — blue collar / white collar collaboration */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format"
                  alt="Collaboration cols bleus et cols blancs en milieu industriel"
                  width={800}
                  height={600}
                  className="object-cover w-full h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-heading text-lg font-semibold">Des équipes solides, ça se forge.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Services Timeline */}
      <ScrollTimeline />

      {/* Diagnostic Quiz */}
      <DiagnosticQuiz />

      {/* NEXOS: Image banner — industrial team pride */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80&auto=format"
          alt="Équipe industrielle fière et diversifiée"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-dark/50 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-6">
          <AnimatedSection direction="none">
            <h2 className="text-white mb-4 text-3xl md:text-5xl">
              Investir dans vos RH,<br />
              <span className="text-gradient-warm">c&apos;est investir dans votre croissance</span>
            </h2>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center mt-4 rounded-xl bg-terracotta-500 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-terracotta-600 hover:shadow-xl hover:shadow-terracotta-500/25"
              strength={0.3}
            >
              Parlons-en
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Cost Calculator */}
      <CostCalculator />

      {/* Myths Flip Cards */}
      <FlipCards />

      {/* Testimonials Before/After */}
      <TestimonialsCarousel />

      {/* NEXOS: Final CTA — diverse industrial team happy */}
      <section id="contact" className="relative overflow-hidden min-h-[60vh] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80&auto=format"
          alt="Équipe industrielle diversifiée et souriante"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-image-overlay" />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <AuroraBackground />
        <div className="container-narrow relative z-10 text-center section-padding">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 !text-white">
              {t("cta_final.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 text-lg text-cream-300/90">{t("cta_final.subtitle")}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-terracotta-500 px-10 py-5 text-lg font-medium text-white transition-all hover:bg-terracotta-600 hover:shadow-xl hover:shadow-terracotta-500/25"
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
