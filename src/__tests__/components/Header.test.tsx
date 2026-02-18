import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

const mockPush = vi.fn();
const mockReplace = vi.fn();

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
  usePathname: () => "/",
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

import { Header } from "@/components/layout/Header";

afterEach(cleanup);

describe("Header", () => {
  it("renders the Collectif Nova brand", () => {
    render(<Header />);
    expect(screen.getByText(/Collectif/)).toBeInTheDocument();
    expect(screen.getByText("Nova")).toBeInTheDocument();
  });

  it("renders navigation links (Services, about, contact)", () => {
    render(<Header />);
    expect(screen.getAllByText("services").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("about").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("contact").length).toBeGreaterThanOrEqual(1);
  });

  it("renders language switcher", () => {
    render(<Header />);
    const langBtns = screen.getAllByLabelText("Passer a l'anglais");
    expect(langBtns.length).toBeGreaterThanOrEqual(1);
    expect(langBtns[0]).toHaveTextContent("EN");
  });

  it("toggles mobile menu", () => {
    render(<Header />);
    const toggle = screen.getByLabelText("Ouvrir le menu");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("renders CTA link (Demarrer)", () => {
    render(<Header />);
    const ctas = screen.getAllByText("cta");
    expect(ctas.length).toBeGreaterThanOrEqual(1);
  });

  it("calls router.replace on locale switch", () => {
    render(<Header />);
    const langBtns = screen.getAllByLabelText("Passer a l'anglais");
    fireEvent.click(langBtns[0]);
    expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
  });
});
