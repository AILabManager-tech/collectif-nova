"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 6,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-1.5, 1.5, -1.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
