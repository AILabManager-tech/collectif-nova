"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const steps = ["diagnostic", "implementation", "coaching"] as const;
const icons = ["🔍", "🛠", "🎯"];
const colors = ["text-sage-600", "text-terracotta-500", "text-gold-600"];

/**
 * ScrollTimeline - Vertical scroll-driven timeline displaying service steps with animated progress line.
 *
 * @component
 * @example
 * ```tsx
 * <ScrollTimeline />
 * ```
 */
export function ScrollTimeline() {
  const t = useTranslations("home.services");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="services" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">{t("title")}</h2>
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-2xl">
          {/* Vertical line background */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-cream-400 md:left-1/2 md:-translate-x-px" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 top-0 w-0.5 bg-sage-400 md:left-1/2 md:-translate-x-px"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {steps.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative pl-16 md:pl-0"
              >
                {/* Node dot */}
                <motion.div
                  className="absolute left-3 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-sage-300 md:left-1/2 md:-translate-x-1/2"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-sm">{icons[index]}</span>
                </motion.div>

                {/* Content */}
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <span className={`font-heading text-sm font-bold uppercase tracking-wider ${colors[index]}`}>
                      {t(`${key}.duration`)}
                    </span>
                    <h3 className="mt-1 mb-2">{t(`${key}.title`)}</h3>
                    <p className="text-taupe">{t(`${key}.description`)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
