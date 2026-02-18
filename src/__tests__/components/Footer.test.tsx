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

vi.mock("@/components/legal/CookieConsent", () => ({
  CookieSettingsButton: () => <button>Cookie Settings</button>,
}));

import { Footer } from "@/components/layout/Footer";

afterEach(cleanup);

describe("Footer", () => {
  it("renders footer element", () => {
    render(<Footer />);
    expect(document.querySelector("footer")).toBeInTheDocument();
  });

  it("renders the Collectif Nova brand name", () => {
    render(<Footer />);
    expect(screen.getByText(/Collectif/)).toBeInTheDocument();
    expect(screen.getByText("Nova")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("services")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
  });

  it("renders legal links (privacy, legal mentions)", () => {
    render(<Footer />);
    const privacyLink = screen.getByText("privacy");
    expect(privacyLink.closest("a")).toHaveAttribute(
      "href",
      "/politique-confidentialite"
    );
    const legalLink = screen.getByText("mentions");
    expect(legalLink.closest("a")).toHaveAttribute(
      "href",
      "/mentions-legales"
    );
  });

  it("renders cookie settings button", () => {
    render(<Footer />);
    expect(screen.getByText("Cookie Settings")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(<Footer />);
    expect(screen.getByText("cta")).toBeInTheDocument();
  });

  it("renders Montreal address", () => {
    render(<Footer />);
    expect(screen.getByText(/Montreal/)).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Behance")).toBeInTheDocument();
    expect(screen.getByLabelText("Dribbble")).toBeInTheDocument();
  });

  it("renders copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/copyright/)).toBeInTheDocument();
  });

  it("renders newsletter section", () => {
    render(<Footer />);
    expect(screen.getByText("newsletter.title")).toBeInTheDocument();
    expect(screen.getByText("newsletter.button")).toBeInTheDocument();
  });
});
