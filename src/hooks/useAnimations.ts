"use client";

import { useState, useEffect, useRef, type RefObject } from "react";

export function useInView(ref: RefObject<Element | null>, options?: { once?: boolean; margin?: string }): boolean {
  const [isInView, setIsInView] = useState(false);
  // Store options in refs to avoid stale closures and dependency warnings
  const onceRef = useRef(options?.once);
  const marginRef = useRef(options?.margin);
  onceRef.current = options?.once;
  marginRef.current = options?.margin;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        setIsInView(true);
        if (onceRef.current !== false) observer.disconnect();
      }
    }, { rootMargin: marginRef.current || "0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}
