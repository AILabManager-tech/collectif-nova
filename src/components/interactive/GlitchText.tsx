"use client";

/* ------------------------------------------------------------------ */
/*  GlitchText — CSS-only glitch effect for headings and text         */
/* ------------------------------------------------------------------ */

import { type ReactNode } from "react";

type TagName = "h1" | "h2" | "h3" | "p" | "span";
type Intensity = "low" | "medium" | "high";

interface GlitchTextProps {
  children: ReactNode;
  as?: TagName;
  className?: string;
  intensity?: Intensity;
}

/** Animation duration per intensity level */
const INTENSITY_DURATION: Record<Intensity, string> = {
  low: "4s",
  medium: "2.5s",
  high: "1.5s",
};

/** Clip-path keyframes per intensity — more aggressive = more clips */
const INTENSITY_CLIPS: Record<Intensity, string> = {
  low: `
    0%, 90%, 100% { clip-path: inset(0 0 0 0); }
    92% { clip-path: inset(40% 0 30% 0); }
    94% { clip-path: inset(10% 0 60% 0); }
    96% { clip-path: inset(70% 0 5% 0); }
  `,
  medium: `
    0%, 80%, 100% { clip-path: inset(0 0 0 0); }
    82% { clip-path: inset(30% 0 25% 0); }
    84% { clip-path: inset(55% 0 10% 0); }
    86% { clip-path: inset(5% 0 70% 0); }
    88% { clip-path: inset(45% 0 20% 0); }
    90% { clip-path: inset(15% 0 50% 0); }
  `,
  high: `
    0%, 60%, 100% { clip-path: inset(0 0 0 0); }
    62% { clip-path: inset(20% 0 40% 0); }
    64% { clip-path: inset(60% 0 5% 0); }
    66% { clip-path: inset(5% 0 60% 0); }
    68% { clip-path: inset(40% 0 25% 0); }
    70% { clip-path: inset(75% 0 2% 0); }
    72% { clip-path: inset(10% 0 55% 0); }
    74% { clip-path: inset(50% 0 15% 0); }
    76% { clip-path: inset(30% 0 35% 0); }
  `,
};

/**
 * GlitchText — Pure CSS glitch effect component.
 *
 * Uses `::before` and `::after` pseudo-elements with clip-path animations
 * and colour-shifted offsets (violet & cyan artefacts). Respects
 * `prefers-reduced-motion` by disabling the animation entirely.
 *
 * @component
 * @example
 * ```tsx
 * <GlitchText as="h1" intensity="medium">Collectif Nova</GlitchText>
 * ```
 */
export function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  intensity = "medium",
}: GlitchTextProps) {
  const duration = INTENSITY_DURATION[intensity];
  const clipBefore = INTENSITY_CLIPS[intensity];
  const clipAfter = INTENSITY_CLIPS[intensity];

  /** Unique id to scope the keyframes and avoid collisions */
  const scopeId = `glitch-${intensity}`;

  return (
    <>
      {/* Scoped keyframes injected via <style> */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${scopeId}-before {
              ${clipBefore}
            }
            @keyframes ${scopeId}-after {
              ${clipAfter}
            }

            .${scopeId} {
              position: relative;
              display: inline-block;
            }

            .${scopeId}::before,
            .${scopeId}::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }

            .${scopeId}::before {
              color: #7B61FF;
              animation: ${scopeId}-before ${duration} infinite linear;
              transform: translate(-2px, -1px);
              opacity: 0.7;
            }

            .${scopeId}::after {
              color: #00E5CC;
              animation: ${scopeId}-after ${duration} infinite linear reverse;
              transform: translate(2px, 1px);
              opacity: 0.7;
            }

            @media (prefers-reduced-motion: reduce) {
              .${scopeId}::before,
              .${scopeId}::after {
                animation: none;
                opacity: 0;
              }
            }
          `,
        }}
      />
      <Tag
        className={`${scopeId} ${className}`}
        data-text={typeof children === "string" ? children : undefined}
      >
        {children}
      </Tag>
    </>
  );
}
