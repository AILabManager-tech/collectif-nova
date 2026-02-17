"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const myths = ["m1", "m2", "m3", "m4"] as const;

function FlipCard({ mythKey, index }: { mythKey: string; index: number }) {
  const t = useTranslations("myths");
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-64 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      aria-label={flipped ? t(`${mythKey}.reality`) : t(`${mythKey}.myth`)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" as const, stiffness: 100, damping: 20 }}
      >
        {/* Front — Myth */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-md [backface-visibility:hidden]">
          <span className="mb-3 text-3xl">
            {index === 0 ? "🏢" : index === 1 ? "💰" : index === 2 ? "📋" : "🤝"}
          </span>
          <p className="font-heading text-lg font-semibold text-charcoal">
            &ldquo;{t(`${mythKey}.myth`)}&rdquo;
          </p>
          <p className="mt-3 text-xs text-taupe">
            ↻
          </p>
        </div>

        {/* Back — Reality */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-sage-600 p-6 text-center text-white shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm leading-relaxed">
            {t(`${mythKey}.reality`)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * FlipCards - Grid of myth-busting cards that flip on click to reveal reality.
 *
 * @component
 * @example
 * ```tsx
 * <FlipCards />
 * ```
 */
export function FlipCards() {
  const t = useTranslations("myths");

  return (
    <section className="section-padding bg-cream-400">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {myths.map((key, i) => (
            <FlipCard key={key} mythKey={key} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
