import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark text-cream-400">
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

          {/* Contact */}
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
                className="transition-colors hover:text-cream-200"
              >
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
