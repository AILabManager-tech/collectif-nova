"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Header navigation component with locale-aware links and mobile menu.
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

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="sticky top-0 z-50 bg-cream-200/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-sage-500 via-terracotta-400 to-gold-400" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo wordmark */}
        <Link href="/" className="font-heading text-xl font-semibold text-charcoal">
          {locale === "fr" ? "L'Usine" : "HR Factory"}
          {locale === "fr" && <span className="text-gradient-warm"> RH</span>}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`relative text-sm font-medium transition-colors hover:text-sage-600 ${
                pathname === href
                  ? "text-sage-600"
                  : "text-charcoal-light"
              }`}
            >
              {t(key)}
              {pathname === href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-sage-500" />
              )}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="rounded-lg border border-sage-200/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-taupe transition-all hover:border-sage-400 hover:text-sage-600 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
            aria-label={locale === "fr" ? "Passer à l'anglais" : "Switch to French"}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="rounded-xl bg-terracotta-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-terracotta-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-terracotta-500/20"
          >
            {t("cta")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 rounded-md p-1"
          aria-label={locale === "fr" ? "Ouvrir le menu" : "Toggle menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`h-0.5 w-6 bg-charcoal transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav id="mobile-nav" className="border-t border-cream-400/50 bg-cream-200/95 backdrop-blur-xl px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium ${
                  pathname === href
                    ? "text-sage-600"
                    : "text-charcoal-light"
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={switchLocale}
                className="rounded-lg border border-sage-200 px-3 py-1.5 text-sm text-taupe focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
                aria-label={locale === "fr" ? "Switch to English" : "Passer au français"}
              >
                {locale === "fr" ? "English" : "Français"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-terracotta-500 px-5 py-2 text-sm font-medium text-white"
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
