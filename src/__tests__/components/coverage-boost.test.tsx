/**
 * coverage-boost.test.tsx
 * -----------------------------------------------------------------------
 * Deep-interaction tests that exercise the previously-uncovered branches
 * in CostCalculator, DiagnosticQuiz, MagneticButton, FlipCards,
 * TestimonialsCarousel, ChatWidget, Header (mobile menu) and ClientWidgets.
 * -----------------------------------------------------------------------
 */
import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeAll, beforeEach, vi } from "vitest";

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
/*  Mocks — framer-motion (inline factory, same as animations.test)    */
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
/*  Mocks — ChatWidget (for ClientWidgets only — avoid double import)  */
/* ------------------------------------------------------------------ */
vi.mock("@/components/interactive/ChatWidget", async (importOriginal) => {
  const actual = await importOriginal() as Record<string, unknown>;
  return actual;
});

import React from "react";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

/* ================================================================== */
/*  Component imports (AFTER mocks)                                    */
/* ================================================================== */
import { CostCalculator } from "@/components/interactive/CostCalculator";
import { DiagnosticQuiz } from "@/components/interactive/DiagnosticQuiz";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FlipCards } from "@/components/interactive/FlipCards";
import { TestimonialsCarousel } from "@/components/interactive/TestimonialsCarousel";
import { ChatWidget } from "@/components/interactive/ChatWidget";
import { Header } from "@/components/layout/Header";
import { ClientWidgets } from "@/components/layout/ClientWidgets";

/* ================================================================== */
/*  1. CostCalculator — slider interactions & calculation output       */
/* ================================================================== */
describe("CostCalculator — slider interactions", () => {
  it("updates employees count when slider is changed", () => {
    render(<CostCalculator />);
    const employeeSlider = document.getElementById("calc-employees") as HTMLInputElement;
    expect(employeeSlider).toBeTruthy();

    // Default is 25; change to 40
    fireEvent.change(employeeSlider, { target: { value: "40" } });
    // The span next to the label should show the new value
    expect(screen.getByText("40")).toBeInTheDocument();
  });

  it("updates salary when salary slider is changed", () => {
    render(<CostCalculator />);
    const salarySlider = document.getElementById("calc-salary") as HTMLInputElement;
    expect(salarySlider).toBeTruthy();

    fireEvent.change(salarySlider, { target: { value: "75000" } });
    // Salary formatted as "75 000 $" in fr-CA locale
    expect(screen.getByText(/75.*000.*\$/)).toBeInTheDocument();
  });

  it("updates turnover percentage when turnover slider is changed", () => {
    render(<CostCalculator />);
    const turnoverSlider = document.getElementById("calc-turnover") as HTMLInputElement;
    expect(turnoverSlider).toBeTruthy();

    fireEvent.change(turnoverSlider, { target: { value: "40" } });
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("recalculates total cost correctly after all slider changes", () => {
    render(<CostCalculator />);

    // Set employees to 50
    fireEvent.change(document.getElementById("calc-employees")!, { target: { value: "50" } });
    // Set salary to 60000
    fireEvent.change(document.getElementById("calc-salary")!, { target: { value: "60000" } });
    // Set turnover to 20%
    fireEvent.change(document.getElementById("calc-turnover")!, { target: { value: "20" } });

    // departures = round(50 * 20 / 100) = 10
    // costPerDeparture = round(60000 * 0.33) = 19800
    // totalCost = 10 * 19800 = 198000
    const countUp = screen.getByTestId("countup");
    expect(countUp).toHaveTextContent("198000");
  });

  it("shows departures and cost per departure in result area", () => {
    render(<CostCalculator />);
    // defaults: employees=25, salary=55000, turnover=25
    // departures = round(25*25/100) = 6
    // costPerDeparture = round(55000*0.33) = 18150
    expect(screen.getByText(/6.*departures/)).toBeInTheDocument();
  });
});

/* ================================================================== */
/*  2. DiagnosticQuiz — navigation, answers, result & restart          */
/* ================================================================== */
describe("DiagnosticQuiz — quiz navigation and result", () => {
  it("renders the first question with 3 option buttons", () => {
    render(<DiagnosticQuiz />);
    // Option buttons contain A, B, C
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    // Progress text shows 1/5
    expect(screen.getByText("1/5")).toBeInTheDocument();
  });

  it("advances to the next question when an answer is clicked", () => {
    render(<DiagnosticQuiz />);
    // Click option A on question 1
    const buttons = screen.getAllByRole("button");
    // First 3 buttons are A, B, C options
    fireEvent.click(buttons[0]); // Answer A (score=0)
    // Should now show 2/5
    expect(screen.getByText("2/5")).toBeInTheDocument();
  });

  it("shows result after answering all 5 questions", () => {
    render(<DiagnosticQuiz />);

    // Answer all 5 questions with option C (score=20 each => total=100 => "high")
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole("button");
      // option C is the 3rd button in the current question
      // Find buttons that contain the option text
      const optionC = buttons.find((btn) => btn.textContent?.includes("C"));
      expect(optionC).toBeTruthy();
      fireEvent.click(optionC!);
    }

    // Should show result: 5/5 progress and score /100
    expect(screen.getByText("5/5")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("/100")).toBeInTheDocument();
  });

  it("shows low result for all-A answers (score=0)", () => {
    render(<DiagnosticQuiz />);

    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole("button");
      const optionA = buttons.find((btn) => btn.textContent?.includes("A"));
      fireEvent.click(optionA!);
    }

    // totalScore = 0 => level = "low"
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("results.low.title")).toBeInTheDocument();
    expect(screen.getByText("results.low.description")).toBeInTheDocument();
  });

  it("shows mid result for mixed answers (score between 31-70)", () => {
    render(<DiagnosticQuiz />);

    // Answer: B(10), B(10), B(10), B(10), C(20) => total=60 => "mid"
    for (let i = 0; i < 4; i++) {
      const buttons = screen.getAllByRole("button");
      const optionB = buttons.find((btn) => btn.textContent?.includes("B"));
      fireEvent.click(optionB!);
    }
    const buttons = screen.getAllByRole("button");
    const optionC = buttons.find((btn) => btn.textContent?.includes("C"));
    fireEvent.click(optionC!);

    expect(screen.getByText("results.mid.title")).toBeInTheDocument();
  });

  it("restarts the quiz when restart button is clicked", () => {
    render(<DiagnosticQuiz />);

    // Complete the quiz
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole("button");
      const optionA = buttons.find((btn) => btn.textContent?.includes("A"));
      fireEvent.click(optionA!);
    }

    // Click restart button
    const restartBtn = screen.getByText("restart");
    fireEvent.click(restartBtn);

    // Should be back to question 1
    expect(screen.getByText("1/5")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});

/* ================================================================== */
/*  3. MagneticButton — mouse events                                   */
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
    // The wrapper is the inline-block div containing the button
    const wrapper = screen.getByText("Hover").closest(".inline-block");
    expect(wrapper).toBeTruthy();

    // Fire mouseMove — this exercises handleMouse (lines 51-59)
    fireEvent.mouseMove(wrapper!, { clientX: 60, clientY: 25 });
    // No error thrown = success; the function ran through getBoundingClientRect + set()
  });

  it("handles mouseLeave event on wrapper div", () => {
    render(<MagneticButton href="/test">Hover</MagneticButton>);
    const wrapper = screen.getByText("Hover").closest(".inline-block");
    expect(wrapper).toBeTruthy();

    // Fire mouseLeave — this exercises handleLeave (lines 61-64)
    fireEvent.mouseLeave(wrapper!);
    // No error thrown = success; x.set(0) and y.set(0) were called
  });

  it("handles mouseMove followed by mouseLeave", () => {
    render(<MagneticButton href="/test" strength={0.5}>Interactive</MagneticButton>);
    const wrapper = screen.getByText("Interactive").closest(".inline-block");

    fireEvent.mouseMove(wrapper!, { clientX: 80, clientY: 30 });
    fireEvent.mouseMove(wrapper!, { clientX: 90, clientY: 35 });
    fireEvent.mouseLeave(wrapper!);
    // Full interaction cycle covered
  });
});

/* ================================================================== */
/*  4. FlipCards — click and keyboard flip                             */
/* ================================================================== */
describe("FlipCards — flip interaction", () => {
  it("renders 4 flip cards", () => {
    render(<FlipCards />);
    const cards = screen.getAllByRole("button");
    expect(cards.length).toBe(4);
  });

  it("flips a card on click (toggles aria-label)", () => {
    render(<FlipCards />);
    const cards = screen.getAllByRole("button");
    const firstCard = cards[0];

    // Before flip: aria-label should be the myth text
    expect(firstCard).toHaveAttribute("aria-label", "m1.myth");

    // Click to flip
    fireEvent.click(firstCard);
    // After flip: aria-label should change to the reality text
    expect(firstCard).toHaveAttribute("aria-label", "m1.reality");
  });

  it("flips a card back on second click", () => {
    render(<FlipCards />);
    const cards = screen.getAllByRole("button");
    const card = cards[1];

    fireEvent.click(card); // flip
    expect(card).toHaveAttribute("aria-label", "m2.reality");

    fireEvent.click(card); // flip back
    expect(card).toHaveAttribute("aria-label", "m2.myth");
  });

  it("flips a card on Enter keydown", () => {
    render(<FlipCards />);
    const cards = screen.getAllByRole("button");
    const card = cards[2];

    fireEvent.keyDown(card, { key: "Enter" });
    expect(card).toHaveAttribute("aria-label", "m3.reality");
  });

  it("does not flip on non-Enter keydown", () => {
    render(<FlipCards />);
    const cards = screen.getAllByRole("button");
    const card = cards[3];

    fireEvent.keyDown(card, { key: "Space" });
    // Should NOT flip
    expect(card).toHaveAttribute("aria-label", "m4.myth");
  });
});

/* ================================================================== */
/*  5. TestimonialsCarousel — tab navigation                           */
/* ================================================================== */
describe("TestimonialsCarousel — tab navigation", () => {
  it("renders 3 tab buttons", () => {
    render(<TestimonialsCarousel />);
    // Tab buttons show industry names
    expect(screen.getByText("c1.industry")).toBeInTheDocument();
    expect(screen.getByText("c2.industry")).toBeInTheDocument();
    expect(screen.getByText("c3.industry")).toBeInTheDocument();
  });

  it("shows first case content by default", () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByText("c1.before_title")).toBeInTheDocument();
    expect(screen.getByText("c1.after_title")).toBeInTheDocument();
    expect(screen.getByText("c1.metric")).toBeInTheDocument();
  });

  it("switches to second case when tab 2 is clicked", () => {
    render(<TestimonialsCarousel />);
    fireEvent.click(screen.getByText("c2.industry"));

    expect(screen.getByText("c2.before_title")).toBeInTheDocument();
    expect(screen.getByText("c2.after_title")).toBeInTheDocument();
    expect(screen.getByText("c2.before")).toBeInTheDocument();
    expect(screen.getByText("c2.after")).toBeInTheDocument();
    expect(screen.getByText("c2.metric")).toBeInTheDocument();
  });

  it("switches to third case when tab 3 is clicked", () => {
    render(<TestimonialsCarousel />);
    fireEvent.click(screen.getByText("c3.industry"));

    expect(screen.getByText("c3.before_title")).toBeInTheDocument();
    expect(screen.getByText("c3.after_title")).toBeInTheDocument();
    expect(screen.getByText("c3.metric")).toBeInTheDocument();
  });

  it("can switch back to first case after navigating away", () => {
    render(<TestimonialsCarousel />);

    // Go to tab 3
    fireEvent.click(screen.getByText("c3.industry"));
    expect(screen.getByText("c3.before_title")).toBeInTheDocument();

    // Go back to tab 1
    fireEvent.click(screen.getByText("c1.industry"));
    expect(screen.getByText("c1.before_title")).toBeInTheDocument();
  });
});

/* ================================================================== */
/*  6. ChatWidget — message sending & keyboard handling                */
/* ================================================================== */
describe("ChatWidget — message sending and keyboard", () => {
  beforeEach(() => {
    // Mock fetch for sendMessage
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends a message when send button is clicked", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Bonjour, comment puis-je vous aider?" }),
    });

    render(<ChatWidget />);

    // Open the chat
    fireEvent.click(screen.getByLabelText("toggle"));

    // Type a message
    const textarea = screen.getByPlaceholderText("placeholder");
    fireEvent.change(textarea, { target: { value: "Bonjour" } });

    // Click send
    await act(async () => {
      fireEvent.click(screen.getByLabelText("send"));
    });

    // Wait for user message to appear
    await waitFor(() => {
      expect(screen.getByText("Bonjour")).toBeInTheDocument();
    });

    // Wait for API response
    await waitFor(() => {
      expect(screen.getByText("Bonjour, comment puis-je vous aider?")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/chat", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }));
  });

  it("sends a message when Enter is pressed (without Shift)", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Reponse" }),
    });

    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));

    const textarea = screen.getByPlaceholderText("placeholder");
    fireEvent.change(textarea, { target: { value: "Test Enter" } });

    await act(async () => {
      fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    });

    await waitFor(() => {
      expect(screen.getByText("Test Enter")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalled();
  });

  it("does NOT send a message when Shift+Enter is pressed", () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));

    const textarea = screen.getByPlaceholderText("placeholder");
    fireEvent.change(textarea, { target: { value: "multiline" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    // fetch should not have been called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("does not send empty messages", () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));

    // Try to send with empty input
    fireEvent.click(screen.getByLabelText("send"));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows error message when API fails", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
    });

    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));

    const textarea = screen.getByPlaceholderText("placeholder");
    fireEvent.change(textarea, { target: { value: "Test error" } });

    await act(async () => {
      fireEvent.click(screen.getByLabelText("send"));
    });

    await waitFor(() => {
      expect(screen.getByText(/erreur est survenue/)).toBeInTheDocument();
    });
  });

  it("shows error message when fetch throws", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Network error"));

    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));

    const textarea = screen.getByPlaceholderText("placeholder");
    fireEvent.change(textarea, { target: { value: "Test network" } });

    await act(async () => {
      fireEvent.click(screen.getByLabelText("send"));
    });

    await waitFor(() => {
      expect(screen.getByText(/erreur est survenue/)).toBeInTheDocument();
    });
  });

  it("closes the chat when close button in header is clicked", () => {
    render(<ChatWidget />);

    // Open
    fireEvent.click(screen.getByLabelText("toggle"));
    expect(screen.getByLabelText("close")).toBeInTheDocument();

    // Close via header close button
    fireEvent.click(screen.getByLabelText("close"));

    // Dialog should be gone
    expect(screen.queryByLabelText("close")).not.toBeInTheDocument();
  });

  it("clears the input after sending a message", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "OK" }),
    });

    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));

    const textarea = screen.getByPlaceholderText("placeholder") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello!" } });
    expect(textarea.value).toBe("Hello!");

    await act(async () => {
      fireEvent.click(screen.getByLabelText("send"));
    });

    // Input should be cleared
    expect(textarea.value).toBe("");
  });
});

/* ================================================================== */
/*  7. Header — mobile menu deep interactions                          */
/* ================================================================== */
describe("Header — mobile menu interactions", () => {
  it("shows mobile nav links when menu is opened", () => {
    render(<Header />);
    const toggle = screen.getByLabelText("Ouvrir le menu");

    fireEvent.click(toggle);

    // Mobile menu should be visible (id=mobile-nav)
    const mobileNav = document.getElementById("mobile-nav");
    expect(mobileNav).toBeTruthy();
  });

  it("closes mobile menu when a nav link is clicked", () => {
    render(<Header />);
    const toggle = screen.getByLabelText("Ouvrir le menu");

    // Open menu
    fireEvent.click(toggle);
    expect(document.getElementById("mobile-nav")).toBeTruthy();

    // Click on a link in the mobile nav
    const mobileNav = document.getElementById("mobile-nav")!;
    const links = mobileNav.querySelectorAll("a");
    // Click the first link (home)
    fireEvent.click(links[0]);

    // Mobile menu should be closed
    expect(document.getElementById("mobile-nav")).toBeNull();
  });

  it("shows language switcher in mobile menu", () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText("Ouvrir le menu"));

    // Mobile menu has a lang switcher with different aria-label
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
    // The CTA is the last link in mobile nav
    const ctaLinks = mobileNav.querySelectorAll("a");
    const ctaLink = ctaLinks[ctaLinks.length - 1];
    fireEvent.click(ctaLink);

    expect(document.getElementById("mobile-nav")).toBeNull();
  });
});

/* ================================================================== */
/*  8. ClientWidgets — renders lazily loaded components                */
/* ================================================================== */
describe("ClientWidgets — dynamic imports", () => {
  it("renders without crashing", async () => {
    const { container } = render(<ClientWidgets />);
    // ClientWidgets renders a fragment with ChatWidget + CookieConsent
    // Due to dynamic import mock, CookieConsent should eventually appear
    await waitFor(() => {
      expect(container.firstChild).toBeTruthy();
    });
  });
});
