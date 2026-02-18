"use client";

import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const CookieConsent = dynamic(
  () =>
    import("@/components/legal/CookieConsent").then((m) => ({
      default: m.CookieConsent,
    })),
  { ssr: false, loading: () => null }
);

/**
 * Client-side wrapper for lazy-loaded widgets (CookieConsent + ScrollToTop + Toaster).
 * No ChatWidget for Collectif Nova. Keeps the root layout a Server Component
 * while deferring heavy client JS.
 *
 * @component
 * @example
 * <ClientWidgets />
 */
export function ClientWidgets() {
  return (
    <>
      <CookieConsent />
      <ScrollToTop />
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            border: "1px solid #33334D",
            color: "#F0F0F5",
          },
        }}
      />
    </>
  );
}
