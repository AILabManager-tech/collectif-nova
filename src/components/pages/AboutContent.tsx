"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { CountUp } from "@/components/animations/CountUp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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
        className="w-full rounded-xl bg-white p-8 text-left shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
              <div className="mt-4 rounded-lg bg-sage-50 p-4">
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

      {/* Values — interactive accordion cards */}
      <section className="section-padding">
        <div className="container-wide">
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
