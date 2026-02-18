import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

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

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
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

import { ContactContent } from "@/components/pages/ContactContent";
import { toast } from "sonner";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("ContactContent", () => {
  it("renders the main element", () => {
    render(<ContactContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title", () => {
    render(<ContactContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders the contact form with name, email, service, budget, message fields", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText("form.name")).toBeInTheDocument();
    expect(screen.getByLabelText("form.email")).toBeInTheDocument();
    expect(screen.getByLabelText("form.service")).toBeInTheDocument();
    expect(screen.getByLabelText("form.budget")).toBeInTheDocument();
    expect(screen.getByLabelText("form.message")).toBeInTheDocument();
  });

  it("renders the consent checkbox", () => {
    render(<ContactContent />);
    const checkbox = document.querySelector('input[name="consent"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveAttribute("required");
  });

  it("renders the submit button", () => {
    render(<ContactContent />);
    expect(screen.getByText("form.submit")).toBeInTheDocument();
  });

  it("renders contact info section with email and address", () => {
    render(<ContactContent />);
    expect(screen.getByText("hello@collectif-nova.ca")).toBeInTheDocument();
    expect(screen.getByText("info.title")).toBeInTheDocument();
  });

  it("renders phone number", () => {
    render(<ContactContent />);
    expect(screen.getByText("(514) 555-0300")).toBeInTheDocument();
  });

  it("submit button is enabled before submission", () => {
    render(<ContactContent />);
    const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(btn).not.toBeDisabled();
  });

  it("shows validation errors on empty form submission (Zod validates before setSending)", async () => {
    render(<ContactContent />);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    // Zod validation fails before setSending(true), so button stays enabled
    const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(btn).not.toBeDisabled();
  });

  it("shows spinner and disables button while sending with valid data", async () => {
    vi.useFakeTimers();
    render(<ContactContent />);

    // Fill all required fields with valid data
    fireEvent.change(screen.getByLabelText("form.name"), { target: { value: "Marie Tremblay" } });
    fireEvent.change(screen.getByLabelText("form.email"), { target: { value: "marie@example.com" } });

    // Select service
    const serviceSelect = screen.getByLabelText("form.service") as HTMLSelectElement;
    fireEvent.change(serviceSelect, { target: { value: "branding" } });

    // Select budget
    const budgetSelect = screen.getByLabelText("form.budget") as HTMLSelectElement;
    fireEvent.change(budgetSelect, { target: { value: "10k-25k" } });

    // Fill message (min 10 chars)
    fireEvent.change(screen.getByLabelText("form.message"), { target: { value: "Besoin d'aide avec notre branding" } });

    // Check consent
    const checkbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(btn).toBeDisabled();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();

    // Advance timers to let the async chain resolve
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });

  it("calls toast.success after successful submission", async () => {
    vi.useFakeTimers();
    render(<ContactContent />);

    fireEvent.change(screen.getByLabelText("form.name"), { target: { value: "Marie Tremblay" } });
    fireEvent.change(screen.getByLabelText("form.email"), { target: { value: "marie@example.com" } });
    fireEvent.change(screen.getByLabelText("form.service") as HTMLSelectElement, { target: { value: "web" } });
    fireEvent.change(screen.getByLabelText("form.budget") as HTMLSelectElement, { target: { value: "25k-50k" } });
    fireEvent.change(screen.getByLabelText("form.message"), { target: { value: "Nous avons besoin d'un nouveau site web" } });
    const checkbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(toast.success).toHaveBeenCalledWith("form.success");
  });

  it("button is re-enabled after submission completes", async () => {
    vi.useFakeTimers();
    render(<ContactContent />);

    fireEvent.change(screen.getByLabelText("form.name"), { target: { value: "Marie Tremblay" } });
    fireEvent.change(screen.getByLabelText("form.email"), { target: { value: "marie@example.com" } });
    fireEvent.change(screen.getByLabelText("form.service") as HTMLSelectElement, { target: { value: "social" } });
    fireEvent.change(screen.getByLabelText("form.budget") as HTMLSelectElement, { target: { value: "5k-10k" } });
    fireEvent.change(screen.getByLabelText("form.message"), { target: { value: "Gestion de nos reseaux sociaux" } });
    const checkbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(btn).not.toBeDisabled();
  });

  it("form fields accept user input", () => {
    render(<ContactContent />);
    const nameInput = screen.getByLabelText("form.name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    expect(nameInput.value).toBe("Test User");
  });

  it("renders response time notice", () => {
    render(<ContactContent />);
    expect(screen.getByText("form.response_time")).toBeInTheDocument();
  });

  it("required fields have correct required attribute", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText("form.name")).toHaveAttribute("required");
    expect(screen.getByLabelText("form.email")).toHaveAttribute("required");
    expect(screen.getByLabelText("form.message")).toHaveAttribute("required");
  });

  it("email field has type email", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText("form.email")).toHaveAttribute("type", "email");
  });

  it("renders Loi 25 notice", () => {
    render(<ContactContent />);
    expect(screen.getByText("loi25.title")).toBeInTheDocument();
  });
});
