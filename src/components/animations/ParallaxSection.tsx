"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useAnimations";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

/**
 * ParallaxSection - Wraps children in a scroll-driven parallax effect with opacity fade.
 *
 * @component
 * @example
 * ```tsx
 * <ParallaxSection speed={0.3}>
 *   <p>Parallax content</p>
 * </ParallaxSection>
 * ```
 */
export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [y, setY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (shouldReduceMotion) return;

    function handleScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress: 0 when element enters at bottom, 1 when it exits at top
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
      setY(speed * 100 - progress * speed * 200);
      // Fade in/out at edges
      if (progress < 0.2) {
        setOpacity(0.4 + (progress / 0.2) * 0.6);
      } else if (progress > 0.8) {
        setOpacity(0.4 + ((1 - progress) / 0.2) * 0.6);
      } else {
        setOpacity(1);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion, speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {shouldReduceMotion ? (
        <div>{children}</div>
      ) : (
        <div style={{ transform: `translateY(${y}px)`, opacity }}>
          {children}
        </div>
      )}
    </div>
  );
}
