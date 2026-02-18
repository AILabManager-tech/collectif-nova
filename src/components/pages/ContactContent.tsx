"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { GlitchText } from "@/components/interactive/GlitchText";
import { NeonBadge } from "@/components/interactive/NeonBadge";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LineReveal } from "@/components/animations/LineReveal";

/* ------------------------------------------------------------------ */
/*  Zod schema — v4 format with { message: "..." }                    */
/* ------------------------------------------------------------------ */

const serviceOptions = [
  "branding",
  "web",
  "social",
  "motion",
  "autre",
] as const;

const budgetOptions = [
  "5k-10k",
  "10k-25k",
  "25k-50k",
  "50k+",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caracteres." }),
  email: z.string().email({ message: "Adresse courriel invalide." }),
  company: z.string().optional(),
  service: z.enum(serviceOptions, { message: "Veuillez choisir un type de projet." }),
  budget: z.enum(budgetOptions, { message: "Veuillez indiquer votre budget." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caracteres." }),
  consent: z.literal(true, { message: "Vous devez accepter la politique de confidentialite." }),
});

/* ------------------------------------------------------------------ */
/*  Form field error display                                           */
/* ------------------------------------------------------------------ */

function FieldError({ errors, field }: { errors: Record<string, string>; field: string }) {
  const msg = errors[field];
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-400" role="alert">
      {msg}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ContactContent -- Contact page for Collectif Nova with a Zod-validated
 * form (name, email, company, service type, budget, message, consent),
 * info sidebar with dark card, and map placeholder. Full dark-mode design.
 *
 * @component
 * @example
 * ```tsx
 * <ContactContent />
 * ```
 */
export function ContactContent() {
  const t = useTranslations("contact");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const raw: Record<string, unknown> = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on" ? true : false,
    };

    const result = contactSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("form.success"));
      form.reset();
      setErrors({});
    } catch {
      toast.error(t("form.error"));
    } finally {
      setSending(false);
    }
  }

  /* Shared input classes — dark mode */
  const inputClass =
    "w-full rounded-xl border border-[#F0F0F5]/10 bg-[#1A1A2E] px-4 py-3 text-[#F0F0F5] font-body transition-all placeholder:text-[#F0F0F5]/30 focus:border-[#7B61FF] focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/20";

  const labelClass = "mb-1.5 block text-sm font-medium text-[#F0F0F5]/80";

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero — dark bg with GlitchText + NeonBadge               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7B61FF]/5 via-transparent to-transparent" />
        <div className="container-narrow text-center relative z-10 section-padding">
          <AnimatedSection delay={0.1} direction="none">
            <div className="mb-6">
              <NeonBadge color="cyan" size="md">
                {t("hero.badge")}
              </NeonBadge>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="none">
            <GlitchText
              as="h1"
              intensity="low"
              className="mb-4 text-4xl text-[#F0F0F5] md:text-5xl"
            >
              {t("hero.title")}
            </GlitchText>
          </AnimatedSection>

          <AnimatedSection delay={0.4} direction="none">
            <p className="text-lg text-[#F0F0F5]/60 md:text-xl font-body">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" color="bg-[#00E5CC]" delay={0.6} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Form + sidebar                                            */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-[#0D0D0D]">
        <div className="container-wide relative z-10">
          <div className="grid gap-12 md:grid-cols-5">
            {/* --- Form --- */}
            <AnimatedSection direction="left" className="md:col-span-3">
              <form
                className="rounded-2xl border border-[#F0F0F5]/10 bg-[#111118] p-8 space-y-5"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      {t("form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                    />
                    <FieldError errors={errors} field="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                    />
                    <FieldError errors={errors} field="email" />
                  </div>
                </div>

                {/* Company + Service type */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className={labelClass}>
                      {t("form.company")}{" "}
                      <span className="text-[#F0F0F5]/30 text-xs">
                        ({t("form.optional")})
                      </span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className={labelClass}>
                      {t("form.service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t("form.service_placeholder")}
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {t(`form.services.${opt}`)}
                        </option>
                      ))}
                    </select>
                    <FieldError errors={errors} field="service" />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    {t("form.budget")}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    className={inputClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("form.budget_placeholder")}
                    </option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`form.budgets.${opt}`)}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={errors} field="budget" />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t("form.message_placeholder")}
                    className={inputClass}
                  />
                  <FieldError errors={errors} field="message" />
                </div>

                {/* Loi 25 consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-[#F0F0F5]/20 bg-[#1A1A2E] text-[#7B61FF] focus:ring-[#7B61FF]/20"
                  />
                  <span className="text-sm text-[#F0F0F5]/60 font-body">
                    {t("form.consent_notice")}{" "}
                    <Link
                      href="/politique-confidentialite"
                      className="text-[#7B61FF] underline underline-offset-2 hover:text-[#00E5CC]"
                    >
                      {t("form.privacy_link")}
                    </Link>
                  </span>
                </label>
                <FieldError errors={errors} field="consent" />

                {/* Submit */}
                <Button type="submit" size="lg" variant="primary" disabled={sending}>
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t("form.sending")}
                    </span>
                  ) : (
                    t("form.submit")
                  )}
                </Button>

                <p className="text-sm text-[#F0F0F5]/40 font-body">
                  {t("form.response_time")}
                </p>
              </form>
            </AnimatedSection>

            {/* --- Sidebar --- */}
            <AnimatedSection direction="right" delay={0.2} className="md:col-span-2">
              {/* Info card */}
              <div className="rounded-2xl border border-[#7B61FF]/20 bg-[#1A1A2E] p-8">
                <h3 className="mb-6 font-heading text-xl font-semibold text-[#F0F0F5]">
                  {t("info.title")}
                </h3>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#7B61FF] mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#7B61FF]">
                        {t("info.address_label")}
                      </p>
                      <p className="text-[#F0F0F5]/70 font-body">
                        4020, rue Saint-Ambroise, bureau 350
                        <br />
                        {t("info.city")}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#00E5CC] mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#00E5CC]">
                        {t("info.phone_label")}
                      </p>
                      <a
                        href="tel:+15145550300"
                        className="text-[#F0F0F5]/70 transition-colors hover:text-[#F0F0F5] font-body"
                      >
                        (514) 555-0300
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#7B61FF] mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#7B61FF]">
                        {t("info.email_label")}
                      </p>
                      <a
                        href="mailto:hello@collectif-nova.ca"
                        className="text-[#F0F0F5]/70 transition-colors hover:text-[#F0F0F5] font-body"
                      >
                        hello@collectif-nova.ca
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#00E5CC] mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#00E5CC]">
                        {t("info.hours_label")}
                      </p>
                      <p className="text-[#F0F0F5]/70 font-body">{t("info.hours_weekday")}</p>
                      <p className="text-[#F0F0F5]/70 font-body">{t("info.hours_weekend")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loi 25 notice */}
              <div className="mt-6 rounded-2xl border border-[#00E5CC]/20 bg-[#00E5CC]/5 p-6">
                <h4 className="mb-2 font-heading text-sm font-semibold text-[#00E5CC]">
                  {t("loi25.title")}
                </h4>
                <p className="text-sm text-[#F0F0F5]/50 leading-relaxed font-body">
                  {t("loi25.notice")}{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-[#00E5CC] underline underline-offset-2 hover:text-[#7B61FF]"
                  >
                    {t("loi25.link")}
                  </Link>
                </p>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 flex h-48 items-center justify-center rounded-2xl border border-[#F0F0F5]/10 bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0D]">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-[#7B61FF]/40" strokeWidth={1.5} />
                  <p className="text-sm text-[#F0F0F5]/30 font-body">
                    {t("map.placeholder")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
