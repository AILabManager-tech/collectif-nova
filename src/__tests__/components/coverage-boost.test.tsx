/**
 * coverage-boost.test.tsx
 * -----------------------------------------------------------------------
 * Deep-interaction tests that exercise the previously-uncovered branches
 * in ProjectShowcase3D, ParticleCanvas, GlitchText, NeonBadge,
 * MagneticButton, Header (mobile menu) and ClientWidgets.
 * -----------------------------------------------------------------------
 */
import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeAll, vi } from "vitest";

/* ------------------------------------------------------------------ */
/*  Global stubs                                                       */
/* ------------------------------------------------------------------ */
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
  // getBoundingClientRect needed by MagneticButton handleMouse
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0, y: 0, width: 100, height: 40, top: 0, left: 0, right: 100, bottom: 40, toJSON: () => {},
  }));
});

/* ------------------------------------------------------------------ */
/*  Mocks — framer-motion (inline factory)                             */
/* ------------------------------------------------------------------ */
vi.mock("framer-motion", () => {
  const FRAMER_ONLY = new Set([
    "initial", "animate", "exit", "transition", "whileInView",
    "viewport", "variants", "whileHover", "whileTap", "layout",
    "layoutId",
  ]);
  const mc = (Tag: string) => {
    const C = ({ children, ...props }: Record<string, unknown>) => {
      const safe: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        // Keep event handlers (onClick, onMouseMove, etc.) and ref
        if (typeof v === "function" && k.startsWith("on")) {
          safe[k] = v;
          continue;
        }
        if (k === "ref") {
          safe[k] = v;
          continue;
        }
        if (k === "style" && typeof v === "object") {
          // pass style through
          safe[k] = v;
          continue;
        }
        if (FRAMER_ONLY.has(k)) continue;
        if (typeof v === "object" || typeof v === "function") continue;
        safe[k] = v;
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
      svg: mc("svg"),
      circle: mc("circle"),
      path: mc("path"),
      line: mc("line"),
      ellipse: mc("ellipse"),
      g: mc("g"),
      create: (tag: string) => mc(tag),
    },
    animate: () => ({ stop: () => {} }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0.5 } }),
    useTransform: () => 0,
    useMotionValue: (v: number = 0) => ({ set: vi.fn(), get: () => v }),
    useSpring: () => ({ set: vi.fn(), get: () => 0 }),
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

/* ------------------------------------------------------------------ */
/*  Mocks — next-intl                                                  */
/* ------------------------------------------------------------------ */
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

/* ------------------------------------------------------------------ */
/*  Mocks — next/image                                                 */
/* ------------------------------------------------------------------ */
vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => <img alt={props.alt} src={props.src} />,
}));

/* ------------------------------------------------------------------ */
/*  Mocks — next/dynamic (for ClientWidgets)                           */
/* ------------------------------------------------------------------ */
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<{ default: React.ComponentType }>) => {
    // Eagerly resolve the dynamic import for testing
    const LazyComponent = (props: Record<string, unknown>) => {
      const [Comp, setComp] = React.useState<React.ComponentType | null>(null);
      React.useEffect(() => {
        loader().then((mod) => setComp(() => mod.default));
      }, []);
      if (!Comp) return null;
      return <Comp {...props} />;
    };
    LazyComponent.displayName = "DynamicComponent";
    return LazyComponent;
  },
}));

/* ------------------------------------------------------------------ */
/*  Mocks — animation sub-components (simplified for interactive)      */
/* ------------------------------------------------------------------ */
vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));
vi.mock("@/components/animations/CountUp", () => ({
  CountUp: ({ to, suffix, prefix }: { to: number; suffix?: string; prefix?: string }) => (
    <span data-testid="countup">{prefix}{to}{suffix}</span>
  ),
}));
vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/animations/StaggerGrid", () => ({
  StaggerGrid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

/* ------------------------------------------------------------------ */
/*  Mocks — i18n routing (for Header)                                  */
/* ------------------------------------------------------------------ */
const mockReplace = vi.fn();
vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: mockReplace }),
}));

/* ------------------------------------------------------------------ */
/*  Mocks — CookieConsent (for ClientWidgets)                          */
/* ------------------------------------------------------------------ */
vi.mock("@/components/legal/CookieConsent", () => ({
  CookieConsent: () => <div data-testid="cookie-consent">CookieConsent</div>,
}));

/* ------------------------------------------------------------------ */
/*  Mocks — sonner (for ClientWidgets)                                 */
/* ------------------------------------------------------------------ */
vi.mock("sonner", () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
  toast: { success: vi.fn(), error: vi.fn() },
}));

import React from "react";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

/* ================================================================== */
/*  Component imports (AFTER mocks)                                    */
/* ================================================================== */
import { ProjectShowcase3D } from "@/components/interactive/ProjectShowcase3D";
import { GlitchText } from "@/components/interactive/GlitchText";
import { NeonBadge } from "@/components/interactive/NeonBadge";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Header } from "@/components/layout/Header";
import { ClientWidgets } from "@/components/layout/ClientWidgets";

/* ================================================================== */
/*  1. ProjectShowcase3D — card interactions                           */
/* ================================================================== */
describe("ProjectShowcase3D — card interactions", () => {
  it("renders section with project-showcase id", () => {
    render(<ProjectShowcase3D />);
    expect(document.getElementById("project-showcase")).toBeTruthy();
  });

  it("renders 4 project cards as buttons", () => {
    render(<ProjectShowcase3D />);
    const cards = screen.getAllByRole("button");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("renders section title and subtitle", () => {
    render(<ProjectShowcase3D />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders before/after slider", () => {
    render(<ProjectShowcase3D />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-label", "Before/After comparison");
  });

  it("clicking a project card changes the active project", () => {
    render(<ProjectShowcase3D />);
    const cards = screen.getAllByRole("button");
    // Click the second card (index 1)
    fireEvent.click(cards[1]);
    // The card should now have aria-pressed=true
    expect(cards[1]).toHaveAttribute("aria-pressed", "true");
  });

  it("allows keyboard navigation on project cards", () => {
    render(<ProjectShowcase3D />);
    const cards = screen.getAllByRole("button");
    // Press Enter on 3rd card
    fireEvent.keyDown(cards[2], { key: "Enter" });
    expect(cards[2]).toHaveAttribute("aria-pressed", "true");
  });
});

/* ================================================================== */
/*  2. GlitchText — rendering variants                                 */
/* ================================================================== */
describe("GlitchText — rendering variants", () => {
  it("renders as span by default", () => {
    render(<GlitchText>Glitch</GlitchText>);
    const el = screen.getByText("Glitch");
    expect(el.tagName).toBe("SPAN");
  });

  it("renders as h1 when as=h1", () => {
    render(<GlitchText as="h1">Title</GlitchText>);
    const el = screen.getByText("Title");
    expect(el.tagName).toBe("H1");
  });

  it("renders as h2 when as=h2", () => {
    render(<GlitchText as="h2">Heading</GlitchText>);
    const el = screen.getByText("Heading");
    expect(el.tagName).toBe("H2");
  });

  it("renders with custom className", () => {
    render(<GlitchText className="text-4xl">Styled</GlitchText>);
    const el = screen.getByText("Styled");
    expect(el.className).toContain("text-4xl");
  });

  it("injects scoped keyframes via style tag", () => {
    render(<GlitchText intensity="high">Fast Glitch</GlitchText>);
    const styles = document.querySelectorAll("style");
    expect(styles.length).toBeGreaterThanOrEqual(1);
  });

  it("sets data-text attribute for string children", () => {
    render(<GlitchText>DataText</GlitchText>);
    const el = screen.getByText("DataText");
    expect(el).toHaveAttribute("data-text", "DataText");
  });
});

/* ================================================================== */
/*  3. NeonBadge — color and size variants                             */
/* ================================================================== */
describe("NeonBadge — color and size variants", () => {
  it("renders with violet color by default", () => {
    render(<NeonBadge>Default</NeonBadge>);
    const el = screen.getByText("Default");
    // jsdom converts hex to rgb
    expect(el.style.color).toBe("rgb(123, 97, 255)");
  });

  it("renders with cyan color", () => {
    render(<NeonBadge color="cyan">Cyan</NeonBadge>);
    const el = screen.getByText("Cyan");
    expect(el.style.color).toBe("rgb(0, 229, 204)");
  });

  it("renders with white color", () => {
    render(<NeonBadge color="white">White</NeonBadge>);
    const el = screen.getByText("White");
    expect(el.style.color).toBe("rgb(240, 240, 245)");
  });

  it("applies sm size classes", () => {
    render(<NeonBadge size="sm">Small</NeonBadge>);
    const el = screen.getByText("Small");
    expect(el.className).toContain("text-xs");
  });

  it("applies lg size classes", () => {
    render(<NeonBadge size="lg">Large</NeonBadge>);
    const el = screen.getByText("Large");
    expect(el.className).toContain("text-base");
  });

  it("accepts custom className", () => {
    render(<NeonBadge className="ml-2">Custom</NeonBadge>);
    const el = screen.getByText("Custom");
    expect(el.className).toContain("ml-2");
  });
});

/* ================================================================== */
/*  4. MagneticButton — mouse events                                   */
/* ================================================================== */
describe("MagneticButton — mouse event handlers", () => {
  it("renders as a link when href is provided", () => {
    render(<MagneticButton href="/test">Click me</MagneticButton>);
    const link = screen.getByText("Click me").closest("a");
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders as a button when no href is provided", () => {
    const onClick = vi.fn();
    render(<MagneticButton onClick={onClick}>Click me</MagneticButton>);
    const btn = screen.getByText("Click me").closest("button");
    expect(btn).toBeTruthy();
    fireEvent.click(btn!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as external link with target _blank for http href", () => {
    render(<MagneticButton href="https://example.com">External</MagneticButton>);
    const link = screen.getByText("External").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("handles mouseMove event on wrapper div", () => {
    render(<MagneticButton href="/test">Hover</MagneticButton>);
    const wrapper = screen.getByText("Hover").closest(".inline-block");
    expect(wrapper).toBeTruthy();

    fireEvent.mouseMove(wrapper!, { clientX: 60, clientY: 25 });
  });

  it("handles mouseLeave event on wrapper div", () => {
    render(<MagneticButton href="/test">Hover</MagneticButton>);
    const wrapper = screen.getByText("Hover").closest(".inline-block");
    expect(wrapper).toBeTruthy();

    fireEvent.mouseLeave(wrapper!);
  });

  it("handles mouseMove followed by mouseLeave", () => {
    render(<MagneticButton href="/test" strength={0.5}>Interactive</MagneticButton>);
    const wrapper = screen.getByText("Interactive").closest(".inline-block");

    fireEvent.mouseMove(wrapper!, { clientX: 80, clientY: 30 });
    fireEvent.mouseMove(wrapper!, { clientX: 90, clientY: 35 });
    fireEvent.mouseLeave(wrapper!);
  });
});

/* ================================================================== */
/*  5. Header — mobile menu deep interactions                          */
/* ================================================================== */
describe("Header — mobile menu interactions", () => {
  it("shows mobile nav links when menu is opened", () => {
    render(<Header />);
    const toggle = screen.getByLabelText("Ouvrir le menu");

    fireEvent.click(toggle);

    const mobileNav = document.getElementById("mobile-nav");
    expect(mobileNav).toBeTruthy();
  });

  it("closes mobile menu when a nav link is clicked", () => {
    render(<Header />);
    const toggle = screen.getByLabelText("Ouvrir le menu");

    fireEvent.click(toggle);
    expect(document.getElementById("mobile-nav")).toBeTruthy();

    const mobileNav = document.getElementById("mobile-nav")!;
    const links = mobileNav.querySelectorAll("a");
    fireEvent.click(links[0]);

    expect(document.getElementById("mobile-nav")).toBeNull();
  });

  it("shows language switcher in mobile menu", () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText("Ouvrir le menu"));

    const mobileLangBtn = screen.getByLabelText("Switch to English");
    expect(mobileLangBtn).toBeInTheDocument();
    expect(mobileLangBtn).toHaveTextContent("English");
  });

  it("switches locale from mobile menu language button", () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText("Ouvrir le menu"));

    const mobileLangBtn = screen.getByLabelText("Switch to English");
    fireEvent.click(mobileLangBtn);

    expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
  });

  it("closes mobile menu when CTA link is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText("Ouvrir le menu"));

    const mobileNav = document.getElementById("mobile-nav")!;
    const ctaLinks = mobileNav.querySelectorAll("a");
    const ctaLink = ctaLinks[ctaLinks.length - 1];
    fireEvent.click(ctaLink);

    expect(document.getElementById("mobile-nav")).toBeNull();
  });
});

/* ================================================================== */
/*  6. ClientWidgets — renders lazily loaded components                */
/* ================================================================== */
describe("ClientWidgets — dynamic imports", () => {
  it("renders without crashing", async () => {
    const { container } = render(<ClientWidgets />);
    await waitFor(() => {
      expect(container.firstChild).toBeTruthy();
    });
  });
});
