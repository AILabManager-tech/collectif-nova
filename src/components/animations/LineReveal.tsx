"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface LineRevealProps {
  className?: string;
  color?: string;
  delay?: number;
}

export function LineReveal({
  className,
  color = "bg-terracotta-400",
  delay = 0,
}: LineRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className={`h-[3px] ${color} rounded-full`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
