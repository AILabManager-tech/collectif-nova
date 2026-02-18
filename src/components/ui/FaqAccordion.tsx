"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * FaqAccordion - Accessible accordion that displays a list of FAQ items with expand/collapse.
 * Dark theme with noir-700 dividers, gris text, and violet accents for Collectif Nova.
 *
 * @component
 * @example
 * ```tsx
 * <FaqAccordion items={[{ question: "Why?", answer: "Because." }]} />
 * ```
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-noir-700">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="flex w-full items-center justify-between py-5 text-left group"
            id={`faq-button-${index}`}
            aria-expanded={openIndex === index}
            aria-controls={`faq-panel-${index}`}
          >
            <span className="pr-4 font-heading text-lg font-medium text-gris-100 group-hover:text-violet-400 transition-colors">
              {item.question}
            </span>
            <ChevronDown
              className={clsx(
                "h-5 w-5 shrink-0 text-violet-400 transition-transform",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            className={clsx(
              "overflow-hidden transition-all",
              openIndex === index
                ? "max-h-96 pb-5 opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
            <p className="text-gris-400 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
