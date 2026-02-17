import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("framer-motion", () => {
  const mc = (Tag: string) => {
    const C = ({ children, ...props }: Record<string, unknown>) => {
      const safe: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (
          typeof v !== "object" &&
          typeof v !== "function" &&
          !["initial", "animate", "exit", "transition", "whileInView",
            "viewport", "variants", "whileHover", "whileTap", "layout",
            "layoutId"].includes(k)
        ) {
          safe[k] = v;
        }
      }
      const El = Tag as unknown as React.ElementType;
      return <El {...safe}>{children as React.ReactNode}</El>;
    };
    C.displayName = `motion.${Tag}`;
    return C;
  };
  return {
    motion: {
      div: mc("div"),
      span: mc("span"),
      button: mc("button"),
      section: mc("section"),
      a: mc("a"),
      h1: mc("h1"),
      h2: mc("h2"),
      h3: mc("h3"),
      p: mc("p"),
      create: (tag: string) => mc(tag),
    },
    animate: () => ({ stop: () => {} }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0.5 } }),
    useTransform: () => 0,
    useMotionValue: (v: number = 0) => ({ set: () => {}, get: () => v }),
    useSpring: () => ({ set: () => {}, get: () => 0 }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => <img alt={props.alt} src={props.src} />,
}));

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));
vi.mock("@/components/animations/CountUp", () => ({
  CountUp: ({ to, suffix }: { to: number; suffix: string }) => <span>{to}{suffix}</span>,
}));
vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/animations/StaggerGrid", () => ({
  StaggerGrid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/animations/MagneticButton", () => ({
  MagneticButton: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

afterEach(cleanup);

import { CostCalculator } from "@/components/interactive/CostCalculator";
import { DiagnosticQuiz } from "@/components/interactive/DiagnosticQuiz";
import { FlipCards } from "@/components/interactive/FlipCards";
import { ScrollTimeline } from "@/components/interactive/ScrollTimeline";
import { TestimonialsCarousel } from "@/components/interactive/TestimonialsCarousel";

describe("Interactive components smoke tests", () => {
  it("CostCalculator renders", () => {
    const { container } = render(<CostCalculator />);
    expect(container.firstChild).toBeTruthy();
  });

  it("DiagnosticQuiz renders", () => {
    const { container } = render(<DiagnosticQuiz />);
    expect(container.firstChild).toBeTruthy();
  });

  it("FlipCards renders", () => {
    const { container } = render(<FlipCards />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ScrollTimeline renders", () => {
    const { container } = render(<ScrollTimeline />);
    expect(container.firstChild).toBeTruthy();
  });

  it("TestimonialsCarousel renders", () => {
    const { container } = render(<TestimonialsCarousel />);
    expect(container.firstChild).toBeTruthy();
  });
});
