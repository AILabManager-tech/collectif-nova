import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeAll, vi } from "vitest";

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

/* eslint-disable @typescript-eslint/no-unused-vars */
vi.mock("framer-motion", () => ({
  motion: {
    button: ({
      children,
      whileHover,
      whileTap,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, unknown>) => (
      <button {...props}>{children}</button>
    ),
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => (
      <div {...props}>{children}</div>
    ),
    svg: ({
      children,
      initial,
      animate,
      exit,
      transition,
      ...props
    }: React.SVGAttributes<SVGSVGElement> & Record<string, unknown>) => (
      <svg {...props}>{children}</svg>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

import { ChatWidget } from "@/components/interactive/ChatWidget";

afterEach(cleanup);

describe("ChatWidget", () => {
  it("renders the toggle button", () => {
    render(<ChatWidget />);
    expect(screen.getByLabelText("toggle")).toBeInTheDocument();
  });

  it("shows greeting message when opened", () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));
    expect(
      screen.getByText(/assistante virtuelle/i)
    ).toBeInTheDocument();
  });

  it("toggles open/close", () => {
    render(<ChatWidget />);
    const toggleBtn = screen.getByLabelText("toggle");
    fireEvent.click(toggleBtn);
    expect(screen.getByLabelText("close")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("has input field and send button when open", () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));
    expect(screen.getByPlaceholderText("placeholder")).toBeInTheDocument();
    expect(screen.getByLabelText("send")).toBeInTheDocument();
  });

  it("send button is disabled with empty input", () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));
    expect(screen.getByLabelText("send")).toBeDisabled();
  });

  it("send button is enabled with text input", () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText("toggle"));
    const textarea = screen.getByPlaceholderText("placeholder");
    fireEvent.change(textarea, { target: { value: "Bonjour" } });
    expect(screen.getByLabelText("send")).not.toBeDisabled();
  });
});
