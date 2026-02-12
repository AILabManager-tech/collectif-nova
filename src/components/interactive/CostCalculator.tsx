"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CountUp } from "@/components/animations/CountUp";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function CostCalculator() {
  const t = useTranslations("calculator");
  const [employees, setEmployees] = useState(25);
  const [salary, setSalary] = useState(55000);
  const [turnover, setTurnover] = useState(25);

  const departures = Math.round((employees * turnover) / 100);
  const costPerDeparture = Math.round(salary * 0.33);
  const totalCost = departures * costPerDeparture;

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-2">{t("title")}</h2>
          <p className="mb-10 text-taupe">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-lg"
        >
          {/* Employees slider */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="calc-employees" className="text-sm font-medium text-charcoal">
                {t("employees_label")}
              </label>
              <span className="font-heading text-lg font-bold text-sage-600">{employees}</span>
            </div>
            <input
              id="calc-employees"
              type="range"
              min={10}
              max={50}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="slider-sage w-full"
            />
            <div className="flex justify-between text-xs text-taupe">
              <span>10</span>
              <span>50</span>
            </div>
          </div>

          {/* Salary slider */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="calc-salary" className="text-sm font-medium text-charcoal">
                {t("salary_label")}
              </label>
              <span className="font-heading text-lg font-bold text-sage-600">
                {salary.toLocaleString("fr-CA")} $
              </span>
            </div>
            <input
              id="calc-salary"
              type="range"
              min={35000}
              max={90000}
              step={5000}
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="slider-sage w-full"
            />
            <div className="flex justify-between text-xs text-taupe">
              <span>35 000 $</span>
              <span>90 000 $</span>
            </div>
          </div>

          {/* Turnover slider */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="calc-turnover" className="text-sm font-medium text-charcoal">
                {t("turnover_label")}
              </label>
              <span className="font-heading text-lg font-bold text-terracotta-500">{turnover}%</span>
            </div>
            <input
              id="calc-turnover"
              type="range"
              min={5}
              max={50}
              value={turnover}
              onChange={(e) => setTurnover(Number(e.target.value))}
              className="slider-terracotta w-full"
            />
            <div className="flex justify-between text-xs text-taupe">
              <span>5%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-cream-400 p-6 text-center">
            <p className="mb-1 text-sm text-taupe">{t("result_title")}</p>
            <p className="font-heading text-4xl font-bold text-terracotta-500">
              <CountUp to={totalCost} prefix="" suffix=" $" duration={0.8} />
            </p>
            <div className="mt-3 flex justify-center gap-6 text-sm text-taupe">
              <span>{departures} {t("departures")}</span>
              <span>{costPerDeparture.toLocaleString("fr-CA")} $ {t("cost_per")}</span>
            </div>
            <p className="mt-3 text-xs italic text-taupe">{t("formula")}</p>
          </div>

          <div className="mt-6 text-center">
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-terracotta-500 px-8 py-3 font-medium text-white transition-colors hover:bg-terracotta-600"
              strength={0.3}
            >
              {t("cta")}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
