"use client";

/* ------------------------------------------------------------------ */
/*  NeonBadge — Luminous badge/tag with neon glow effect              */
/* ------------------------------------------------------------------ */

import { type ReactNode } from "react";

type NeonColor = "violet" | "cyan" | "white";
type BadgeSize = "sm" | "md" | "lg";

interface NeonBadgeProps {
  children: ReactNode;
  color?: NeonColor;
  size?: BadgeSize;
  className?: string;
}

/** Colour mapping — border, text, box-shadow glow */
const COLOR_MAP: Record<
  NeonColor,
  { border: string; text: string; glow: string; glowStrong: string }
> = {
  violet: {
    border: "#7B61FF",
    text: "#7B61FF",
    glow: "rgba(123, 97, 255, 0.4)",
    glowStrong: "rgba(123, 97, 255, 0.15)",
  },
  cyan: {
    border: "#00E5CC",
    text: "#00E5CC",
    glow: "rgba(0, 229, 204, 0.4)",
    glowStrong: "rgba(0, 229, 204, 0.15)",
  },
  white: {
    border: "#F0F0F5",
    text: "#F0F0F5",
    glow: "rgba(240, 240, 245, 0.3)",
    glowStrong: "rgba(240, 240, 245, 0.1)",
  },
};

/** Size mapping — padding, font-size, border-radius */
const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3.5 py-1 text-sm",
  lg: "px-5 py-1.5 text-base",
};

/**
 * NeonBadge — Glowing neon badge component for labels, tags, and badges.
 *
 * Features a luminous border with a pulsing box-shadow glow.
 * Respects `prefers-reduced-motion` by disabling the pulse animation.
 *
 * @component
 * @example
 * ```tsx
 * <NeonBadge color="violet" size="md">Branding</NeonBadge>
 * <NeonBadge color="cyan" size="sm">Next.js</NeonBadge>
 * ```
 */
export function NeonBadge({
  children,
  color = "violet",
  size = "md",
  className = "",
}: NeonBadgeProps) {
  const c = COLOR_MAP[color];

  return (
    <>
      {/* Global keyframes for glow-pulse — only injected once per page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes neon-glow-pulse {
              0%, 100% {
                box-shadow:
                  0 0 4px var(--neon-glow),
                  0 0 12px var(--neon-glow-strong);
              }
              50% {
                box-shadow:
                  0 0 8px var(--neon-glow),
                  0 0 24px var(--neon-glow-strong);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .neon-badge-animated {
                animation: none !important;
              }
            }
          `,
        }}
      />
      <span
        className={`neon-badge-animated inline-flex items-center rounded-full font-heading font-semibold ${SIZE_CLASSES[size]} ${className}`}
        style={
          {
            color: c.text,
            border: `1px solid ${c.border}`,
            backgroundColor: c.glowStrong,
            "--neon-glow": c.glow,
            "--neon-glow-strong": c.glowStrong,
            animation: "neon-glow-pulse 3s ease-in-out infinite",
            boxShadow: `0 0 4px ${c.glow}, 0 0 12px ${c.glowStrong}`,
          } as React.CSSProperties
        }
      >
        {children}
      </span>
    </>
  );
}
