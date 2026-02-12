"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return controls.stop;
  }, [isInView, motionValue, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
