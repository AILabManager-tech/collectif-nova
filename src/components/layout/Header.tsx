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
    <header className="sticky top-0 z-50 border-b border-cream-400 bg-cream-200/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo wordmark */}
        <Link href="/" className="font-heading text-xl font-semibold text-charcoal">
          Sophie Martin
          <span className="text-sage-500"> RH</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-sage-600 ${
                pathname === href
                  ? "text-sage-600"
                  : "text-charcoal-light"
              }`}
            >
              {t(key)}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="rounded-md border border-sage-200 px-3 py-1.5 text-xs font-medium text-taupe transition-colors hover:border-sage-400 hover:text-sage-600"
            aria-label="Switch language"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="rounded-lg bg-terracotta-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-terracotta-600 hover:scale-[1.02]"
          >
            {t("cta")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
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
        <nav className="border-t border-cream-400 bg-cream-200 px-6 pb-6 pt-4 md:hidden">
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
                className="rounded-md border border-sage-200 px-3 py-1.5 text-sm text-taupe"
                aria-label={locale === "fr" ? "Switch to English" : "Passer au français"}
              >
                {locale === "fr" ? "English" : "Français"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-terracotta-500 px-5 py-2 text-sm font-medium text-white"
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
