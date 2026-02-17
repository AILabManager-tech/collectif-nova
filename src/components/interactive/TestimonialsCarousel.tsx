"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const cases = ["c1", "c2", "c3"] as const;

/**
 * TestimonialsCarousel - Tabbed carousel showing before/after case studies with animated metrics.
 *
 * @component
 * @example
 * ```tsx
 * <TestimonialsCarousel />
 * ```
 */
export function TestimonialsCarousel() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2">{t("title")}</h2>
          <p className="text-taupe">{t("subtitle")}</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-3">
          {cases.map((key, i) => (
            <button
              key={key}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === i
                  ? "bg-sage-600 text-white shadow-md"
                  : "bg-white text-taupe hover:bg-sage-50"
              }`}
            >
              {t(`${key}.industry`)}
            </button>
          ))}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-3xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Before */}
              <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm">
                    ✗
                  </span>
                  <h3 className="text-lg text-red-700">
                    {t(`${cases[active]}.before_title`)}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-charcoal-light">
                  {t(`${cases[active]}.before`)}
                </p>
              </div>

              {/* After */}
              <div className="rounded-xl border-2 border-sage-200 bg-sage-50/50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-100 text-sm">
                    ✓
                  </span>
                  <h3 className="text-lg text-sage-700">
                    {t(`${cases[active]}.after_title`)}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-charcoal-light">
                  {t(`${cases[active]}.after`)}
                </p>
              </div>
            </div>

            {/* Metric badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" as const, stiffness: 200, damping: 15 }}
              className="mt-6 flex justify-center"
            >
              <span className="rounded-full bg-gold-400 px-6 py-2 font-heading text-xl font-bold text-white shadow-md">
                {t(`${cases[active]}.metric`)}
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
