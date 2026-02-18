import type { Metadata } from "next";

// Static metadata so Lighthouse can find the description in <head>
// (generateMetadata in [locale]/layout.tsx streams outside <head> in Next.js 15)
export const metadata: Metadata = {
  description:
    "Collectif Nova : branding, design web, stratégie social media et motion design à Montréal. Une agence créative qui transforme votre vision en expériences numériques mémorables.",
};

// Root layout redirects to [locale] layout
// This file is required by Next.js but all rendering happens in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
