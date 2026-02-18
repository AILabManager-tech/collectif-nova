"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { Sparkles } from "lucide-react";

const navLinks = [
  { href: "/services", key: "services" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Header navigation for Collectif Nova with scroll-aware styling,
 * Sparkles brand icon, violet CTA glow effect, and dark theme.
 *
 * @component
 * @example
 * <Header />
 */
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-noir-900/90 backdrop-blur-xl border-b border-gris-800/40 shadow-lg shadow-noir-900/50"
          : "bg-transparent"
      }`}
    >
      {/* Gradient accent line violet -> cyan */}
      <div className="h-0.5 bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand wordmark with Sparkles */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-5 w-5 text-violet-500 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span className="font-heading text-xl font-semibold text-gris-50">
            Collectif{" "}
            <span className="text-gradient">Nova</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`relative text-sm font-medium transition-colors hover:text-violet-400 ${
                pathname === href
                  ? "text-violet-400"
                  : "text-gris-300"
              }`}
            >
              {t(key)}
              {pathname === href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-violet-500" />
              )}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="rounded-lg border border-gris-700 bg-noir-700/50 px-3 py-1.5 text-xs font-medium text-gris-400 transition-all hover:border-violet-500/50 hover:text-violet-400 hover:bg-noir-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-800"
            aria-label={locale === "fr" ? "Passer a l'anglais" : "Switch to French"}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA with glow */}
          <Link
            href="/contact"
            className="relative rounded-xl bg-violet-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 glow-violet"
          >
            {t("cta")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-800 rounded-md p-1"
          aria-label={locale === "fr" ? "Ouvrir le menu" : "Toggle menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`h-0.5 w-6 bg-gris-100 transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gris-100 transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gris-100 transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-gris-800/50 bg-noir-900/95 backdrop-blur-xl px-6 pb-6 pt-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === href
                    ? "text-violet-400"
                    : "text-gris-300 hover:text-gris-100"
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={switchLocale}
                className="rounded-lg border border-gris-700 px-3 py-1.5 text-sm text-gris-400 hover:text-violet-400 hover:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-900"
                aria-label={locale === "fr" ? "Switch to English" : "Passer au francais"}
              >
                {locale === "fr" ? "English" : "Francais"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-violet-500 px-5 py-2 text-sm font-medium text-white hover:bg-violet-600 glow-violet"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
