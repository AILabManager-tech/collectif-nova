"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { CookieSettingsButton } from "@/components/legal/CookieConsent";
import { Sparkles } from "lucide-react";

/**
 * Dark-themed footer for Collectif Nova with address, services,
 * navigation, newsletter signup, social links, and gradient accent line.
 *
 * @component
 * @example
 * <Footer />
 */
export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="relative overflow-hidden bg-noir-900 text-gris-400">
      {/* Gradient accent line violet -> cyan */}
      <div className="h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500" />

      {/* Mini CTA bar */}
      <div className="relative border-b border-gris-800/30 bg-gradient-to-r from-noir-900 via-noir-800 to-noir-900 px-6 py-10 text-center">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        <div className="relative z-10">
          <p className="mb-5 font-heading text-2xl font-semibold text-gris-50">
            {locale === "fr"
              ? "Pret a creer quelque chose d'extraordinaire?"
              : "Ready to create something extraordinary?"}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-8 py-3 font-medium text-white transition-all hover:bg-violet-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 glow-violet"
          >
            {nav("cta")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand + Address */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-violet-500" />
              <p className="font-heading text-lg font-semibold text-gris-50">
                Collectif <span className="text-gradient">Nova</span>
              </p>
            </div>
            <p className="text-sm text-gris-400 mb-4">{t("description")}</p>
            <address className="not-italic text-sm text-gris-400 space-y-1">
              <p>4020, rue Saint-Ambroise</p>
              <p>Bureau 350</p>
              <p>Montreal, QC H4C 2C7</p>
              <p className="mt-2">
                <a
                  href="tel:+15145550300"
                  className="transition-colors hover:text-violet-400"
                >
                  {t("phone")}
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@collectif-nova.ca"
                  className="transition-colors hover:text-violet-400"
                >
                  {t("email")}
                </a>
              </p>
            </address>
          </div>

          {/* Services */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gris-400">
              Services
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/services" className="text-gris-400 transition-colors hover:text-violet-400">
                Branding & Identite
              </Link>
              <Link href="/services" className="text-gris-400 transition-colors hover:text-violet-400">
                Design Web
              </Link>
              <Link href="/services" className="text-gris-400 transition-colors hover:text-violet-400">
                Strategie Social Media
              </Link>
              <Link href="/services" className="text-gris-400 transition-colors hover:text-violet-400">
                Motion Design
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gris-400">
              {t("nav_title")}
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gris-400 transition-colors hover:text-violet-400">
                {nav("home")}
              </Link>
              <Link href="/services" className="text-sm text-gris-400 transition-colors hover:text-violet-400">
                {nav("services")}
              </Link>
              <Link href="/a-propos" className="text-sm text-gris-400 transition-colors hover:text-violet-400">
                {nav("about")}
              </Link>
              <Link href="/contact" className="text-sm text-gris-400 transition-colors hover:text-violet-400">
                {nav("contact")}
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gris-400">
              {t("newsletter.title")}
            </p>
            <p className="mb-3 text-sm text-gris-400">
              {t("newsletter.description")}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 rounded-lg border border-gris-800 bg-noir-800 px-3 py-2 text-sm text-gris-100 placeholder:text-gris-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                aria-label={t("newsletter.placeholder")}
              />
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-900"
              >
                {t("newsletter.button")}
              </button>
            </form>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/collectifnova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-400 transition-colors hover:text-violet-400"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/collectif-nova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-400 transition-colors hover:text-violet-400"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Behance */}
              <a
                href="https://behance.net/collectifnova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-400 transition-colors hover:text-violet-400"
                aria-label="Behance"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              </a>
              {/* Dribbble */}
              <a
                href="https://dribbble.com/collectifnova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-400 transition-colors hover:text-violet-400"
                aria-label="Dribbble"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86 2.578 14.555 1.62 12.003 1.62c-.825 0-1.63.15-2.4.43zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* RPP notice - Loi 25 */}
        <p className="mt-8 text-center text-xs text-gris-400">
          {t("rpp")}
        </p>

        {/* Legal links */}
        <div className="section-divider mt-6 mb-6 opacity-30" />
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/politique-confidentialite"
            className="text-xs text-gris-400 transition-colors hover:text-violet-400"
          >
            {t("privacy")}
          </Link>
          <Link
            href="/mentions-legales"
            className="text-xs text-gris-400 transition-colors hover:text-violet-400"
          >
            {t("mentions")}
          </Link>
          <CookieSettingsButton />
        </div>
        <div className="mt-4 text-center text-xs text-gris-400">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
