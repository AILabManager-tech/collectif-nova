import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/hooks/useAnimations", () => ({
  useInView: () => true,
  useReducedMotion: () => false,
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <h2>{children}</h2>,
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
}));

vi.mock("@/components/animations/MagneticButton", () => ({
  MagneticButton: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/animations/StaggerGrid", () => ({
  StaggerGrid: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/interactive/GlitchText", () => ({
  GlitchText: ({ children, as: Tag = "span" }: { children: React.ReactNode; as?: string }) => {
    const El = Tag as unknown as React.ElementType;
    return <El>{children}</El>;
  },
}));

vi.mock("@/components/interactive/NeonBadge", () => ({
  NeonBadge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

import { AboutContent } from "@/components/pages/AboutContent";

afterEach(cleanup);

describe("AboutContent", () => {
  it("renders the main element", () => {
    render(<AboutContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title", () => {
    render(<AboutContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders story section", () => {
    render(<AboutContent />);
    expect(screen.getByText("story.title")).toBeInTheDocument();
    expect(screen.getByText("story.p1")).toBeInTheDocument();
  });

  it("renders values section", () => {
    render(<AboutContent />);
    expect(screen.getByText("values.title")).toBeInTheDocument();
  });

  it("renders value cards (innovation, authenticity, impact)", () => {
    render(<AboutContent />);
    expect(screen.getByText("values.innovation.title")).toBeInTheDocument();
    expect(screen.getByText("values.authenticity.title")).toBeInTheDocument();
    expect(screen.getByText("values.impact.title")).toBeInTheDocument();
  });

  it("renders team section", () => {
    render(<AboutContent />);
    expect(screen.getByText("team.title")).toBeInTheDocument();
    expect(screen.getByText("team.subtitle")).toBeInTheDocument();
  });

  it("renders team members", () => {
    render(<AboutContent />);
    expect(screen.getByText("team.alex.name")).toBeInTheDocument();
    expect(screen.getByText("team.sam.name")).toBeInTheDocument();
    expect(screen.getByText("team.jules.name")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<AboutContent />);
    expect(screen.getByText("cta.title")).toBeInTheDocument();
    expect(screen.getByText("cta.button")).toBeInTheDocument();
  });
});
