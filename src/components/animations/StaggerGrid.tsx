"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

export function StaggerGrid({
  children,
  className,
  stagger = 0.12,
}: StaggerGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
