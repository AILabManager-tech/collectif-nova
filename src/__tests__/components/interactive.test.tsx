import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("@/hooks/useAnimations", () => ({
  useInView: () => true,
  useReducedMotion: () => false,
}));

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

import { ProjectShowcase3D } from "@/components/interactive/ProjectShowcase3D";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { GlitchText } from "@/components/interactive/GlitchText";
import { NeonBadge } from "@/components/interactive/NeonBadge";

describe("Interactive components smoke tests", () => {
  it("ProjectShowcase3D renders", () => {
    const { container } = render(<ProjectShowcase3D />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ParticleCanvas renders with aria-hidden", () => {
    const { container } = render(<ParticleCanvas />);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("GlitchText renders children", () => {
    render(<GlitchText>Hello Nova</GlitchText>);
    expect(screen.getByText("Hello Nova")).toBeInTheDocument();
  });

  it("NeonBadge renders children", () => {
    render(<NeonBadge>Branding</NeonBadge>);
    expect(screen.getByText("Branding")).toBeInTheDocument();
  });
});
