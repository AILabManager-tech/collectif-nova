"use client";

import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const ChatWidget = dynamic(
  () =>
    import("@/components/interactive/ChatWidget").then((m) => ({
      default: m.ChatWidget,
    })),
  { ssr: false, loading: () => null }
);

const CookieConsent = dynamic(
  () =>
    import("@/components/legal/CookieConsent").then((m) => ({
      default: m.CookieConsent,
    })),
  { ssr: false, loading: () => null }
);

/**
 * Client-side wrapper for lazy-loaded widgets (ChatWidget + CookieConsent + ScrollToTop).
 * Keeps the root layout a Server Component while deferring heavy client JS.
 *
 * @component
 * @example
 * <ClientWidgets />
 */
export function ClientWidgets() {
  return (
    <>
      <ChatWidget />
      <CookieConsent />
      <ScrollToTop />
      <Toaster richColors position="top-right" />
    </>
  );
}
