"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface CountUpProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * CountUp - Animates a number counting up when scrolled into view.
 *
 * @component
 * @example
 * ```tsx
 * <CountUp to={100} suffix="%" duration={2} />
 * ```
 */
export function CountUp({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(shouldReduceMotion ? to : from);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const startTime = performance.now();
    const durationMs = duration * 1000;
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, shouldReduceMotion, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span>{shouldReduceMotion ? to : current}</span>
      {suffix}
    </span>
  );
}
