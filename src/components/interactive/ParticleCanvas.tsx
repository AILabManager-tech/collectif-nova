"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Particle type and helpers                                         */
/* ------------------------------------------------------------------ */

interface Particle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  vx: number;
  vy: number;
  color: "violet" | "cyan";
}

const PARTICLE_COUNT = 20;
const CONNECTION_DISTANCE = 150;
const VIOLET = "#7B61FF";
const CYAN = "#00E5CC";
const LINE_COLOR = "#4A4A5A";

/** Generate initial random particles */
function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    cx: Math.random() * width,
    cy: Math.random() * height,
    r: 2 + Math.random() * 3,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: i % 2 === 0 ? "violet" : "cyan",
  }));
}

/** Calculate connections between close particles */
function getConnections(
  particles: Particle[],
): { x1: number; y1: number; x2: number; y2: number; opacity: number }[] {
  const connections: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  }[] = [];

  for (let i = 0; i < particles.length; i++) {
    const pi = particles[i];
    if (!pi) continue;
    for (let j = i + 1; j < particles.length; j++) {
      const pj = particles[j];
      if (!pj) continue;
      const dx = pi.cx - pj.cx;
      const dy = pi.cy - pj.cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        connections.push({
          x1: pi.cx,
          y1: pi.cy,
          x2: pj.cx,
          y2: pj.cy,
          opacity: 1 - dist / CONNECTION_DISTANCE,
        });
      }
    }
  }

  return connections;
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * ParticleCanvas — Decorative SVG particle network with floating dots
 * and proximity-based connection lines.
 *
 * Used as a background element in the Hero section.
 *
 * @component
 * @example
 * ```tsx
 * <ParticleCanvas />
 * ```
 */
export function ParticleCanvas() {
  const prefersReduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const [particles, setParticles] = useState<Particle[]>(() =>
    createParticles(1200, 600),
  );

  /* --- Responsive dimensions ------------------------------------ */
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* --- Re-create particles when dimensions change --------------- */
  useEffect(() => {
    setParticles(createParticles(dimensions.width, dimensions.height));
  }, [dimensions.width, dimensions.height]);

  /* --- Animation loop ------------------------------------------- */
  useEffect(() => {
    if (prefersReduced) return;

    function tick() {
      setParticles((prev) =>
        prev.map((p) => {
          let { cx, cy, vx, vy } = p;
          cx += vx;
          cy += vy;

          /* Bounce off edges */
          if (cx <= 0 || cx >= dimensions.width) vx *= -1;
          if (cy <= 0 || cy >= dimensions.height) vy *= -1;

          /* Clamp inside bounds */
          cx = Math.max(0, Math.min(dimensions.width, cx));
          cy = Math.max(0, Math.min(dimensions.height, cy));

          return { ...p, cx, cy, vx, vy };
        }),
      );

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [prefersReduced, dimensions.width, dimensions.height]);

  /* --- Compute connections each render -------------------------- */
  const connections = useMemo(() => getConnections(particles), [particles]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" as const }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connection lines */}
        {connections.map((c, i) => (
          <line
            key={`line-${i}`}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke={LINE_COLOR}
            strokeWidth={0.8}
            opacity={c.opacity * 0.4}
          />
        ))}

        {/* Particles */}
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={p.color === "violet" ? VIOLET : CYAN}
            opacity={prefersReduced ? 0.5 : 0.7}
          >
            {/* Static glow for reduced-motion; otherwise the position animates via state */}
            {prefersReduced && (
              <animate
                attributeName="opacity"
                values="0.3;0.5;0.3"
                dur="4s"
                repeatCount="indefinite"
                begin="0s"
              />
            )}
          </circle>
        ))}

        {/* Subtle glow filters */}
        <defs>
          <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    </div>
  );
}
