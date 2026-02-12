"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/animations/MagneticButton";

const questions = ["q1", "q2", "q3", "q4", "q5"] as const;
const options = ["a", "b", "c"] as const;
type Option = (typeof options)[number];
const scores: Record<Option, number> = { a: 0, b: 10, c: 20 };

export function DiagnosticQuiz() {
  const t = useTranslations("quiz");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((sum, v) => sum + v, 0);
  const level = totalScore <= 30 ? "low" : totalScore <= 70 ? "mid" : "high";
  const progressColor =
    totalScore <= 30 ? "bg-red-500" : totalScore <= 70 ? "bg-gold-400" : "bg-sage-500";

  function handleAnswer(score: number) {
    const next = [...answers, score];
    setAnswers(next);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  }

  return (
    <section className="section-padding bg-cream-400">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-2">{t("title")}</h2>
          <p className="mb-8 text-taupe">{t("subtitle")}</p>
        </motion.div>

        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm text-taupe">
              <span>{showResult ? "5/5" : `${current + 1}/5`}</span>
              <span>{showResult ? `${totalScore}/100` : ""}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cream-400">
              <motion.div
                className={`h-full rounded-full ${showResult ? progressColor : "bg-sage-400"}`}
                initial={{ width: 0 }}
                animate={{ width: `${showResult ? 100 : ((current + 1) / 5) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-6 text-center text-lg">
                  {t(`${questions[current]}.question`)}
                </h3>
                <div className="space-y-3">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(scores[opt])}
                      className="group w-full rounded-xl border-2 border-cream-400 px-5 py-4 text-left transition-all duration-200 hover:border-sage-400 hover:bg-sage-50 hover:shadow-sm active:scale-[0.98]"
                    >
                      <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream-400 text-sm font-medium text-taupe transition-colors group-hover:bg-sage-200 group-hover:text-sage-700">
                        {opt.toUpperCase()}
                      </span>
                      <span className="text-charcoal">
                        {t(`${questions[current]}.${opt}`)}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Score circle */}
                <div className="relative mx-auto mb-6 h-32 w-32">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none" stroke="#F0EBE3" strokeWidth="8"
                    />
                    <motion.circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke={totalScore <= 30 ? "#ef4444" : totalScore <= 70 ? "#D4AF37" : "#87947A"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - totalScore / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-heading text-3xl font-bold text-charcoal">{totalScore}</span>
                    <span className="text-xs text-taupe">/100</span>
                  </div>
                </div>

                <h3 className="mb-3 text-xl">{t(`results.${level}.title`)}</h3>
                <p className="mb-6 text-taupe">{t(`results.${level}.description`)}</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <MagneticButton
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg bg-terracotta-500 px-6 py-3 font-medium text-white transition-colors hover:bg-terracotta-600"
                    strength={0.3}
                  >
                    {t(`results.${level}.cta`)}
                  </MagneticButton>
                  <button
                    onClick={restart}
                    className="rounded-lg border-2 border-cream-500 px-6 py-3 font-medium text-taupe transition-colors hover:border-sage-400 hover:text-sage-600"
                  >
                    {t("restart")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
