import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark text-cream-400">
      {/* Mini CTA bar */}
      <div className="border-b border-charcoal bg-charcoal px-6 py-8 text-center">
        <p className="mb-4 font-heading text-xl font-semibold text-cream-200">
          {t("cta")}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-terracotta-500 px-8 py-3 font-medium text-white transition-all hover:bg-terracotta-600 hover:scale-[1.02]"
        >
          {t("cta_button")}
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-semibold text-cream-200">
              Sophie Martin
              <span className="text-sage-400"> RH</span>
            </p>
            <p className="mt-2 text-sm text-cream-600">{t("tagline")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cream-500">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-cream-500 transition-colors hover:text-cream-200">
                {nav("home")}
              </Link>
              <Link href="/services" className="text-sm text-cream-500 transition-colors hover:text-cream-200">
                {nav("services")}
              </Link>
              <Link href="/a-propos" className="text-sm text-cream-500 transition-colors hover:text-cream-200">
                {nav("about")}
              </Link>
              <Link href="/contact" className="text-sm text-cream-500 transition-colors hover:text-cream-200">
                {nav("contact")}
              </Link>
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cream-500">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm text-cream-500">
              <p>Quebec, QC</p>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-cream-200"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-charcoal-light pt-6 text-center text-xs text-cream-700">
          &copy; {year} {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
