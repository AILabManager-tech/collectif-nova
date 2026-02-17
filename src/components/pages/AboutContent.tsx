"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { CountUp } from "@/components/animations/CountUp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AuroraBackground } from "@/components/animations/AuroraBackground";

const values = ["empathy", "transparency", "autonomy"] as const;
const valueIcons = ["💛", "🔍", "🚀"];

function ValueCard({ valueKey, icon, index }: { valueKey: string; icon: string; index: number }) {
  const t = useTranslations("about.values");
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full card-elevated text-left"
        aria-expanded={expanded}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-sage-600 transition-colors group-hover:text-terracotta-500">
            {t(`${valueKey}.title`)}
          </h3>
          <motion.span
            className="ml-auto text-taupe"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▾
          </motion.span>
        </div>
        <p className="text-taupe">{t(`${valueKey}.description`)}</p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-xl bg-sage-50 p-4 border border-sage-100">
                <p className="text-sm italic text-sage-700">
                  {t(`${valueKey}.example`)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

/**
 * About page content with story, philosophy, stats, and expandable value cards.
 *
 * @component
 * @example
 * <AboutContent />
 */
export function AboutContent() {
  const t = useTranslations("about");

  return (
    <main>
      {/* Hero with image */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80&auto=format"
          alt="Consultante RH souriante en milieu professionnel"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-image-overlay" />
        <AuroraBackground />
        <div className="container-narrow text-center relative z-10 section-padding">
          <TextReveal className="mb-4 !text-white">{t("hero.title")}</TextReveal>
          <AnimatedSection delay={0.4} direction="none">
            <p className="text-lg text-cream-300/90 md:text-xl">{t("hero.subtitle")}</p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" delay={0.6} />
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-20">
        <div className="container-wide px-6">
          <div className="glass rounded-2xl p-8">
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
        </div>
      </section>

      {/* Story */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
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

      {/* Philosophy — with image */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format"
              alt="Collaboration d'équipe"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="section-padding flex items-center bg-cream-300/50">
            <div className="max-w-lg">
              <AnimatedSection>
                <TextReveal as="h2" className="mb-4">{t("philosophy.title")}</TextReveal>
              </AnimatedSection>
              <LineReveal className="mb-6 w-16" color="bg-sage-400" delay={0.3} />
              <AnimatedSection delay={0.2}>
                <p className="text-lg leading-relaxed text-taupe">{t("philosophy.p1")}</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((key, i) => (
              <ValueCard key={key} valueKey={key} icon={valueIcons[i] ?? ""} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
