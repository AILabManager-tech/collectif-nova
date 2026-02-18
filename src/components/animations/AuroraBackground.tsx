"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * AuroraBackground - Animated gradient blobs and geometric shapes overlay.
 * Dark theme with violet (#7B61FF) and cyan (#00E5CC) blobs on noir (#0D0D0D) background.
 *
 * @component
 * @example
 * ```tsx
 * <AuroraBackground />
 * ```
 */
export function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();

  // When reduced motion is preferred, render static blobs without animation
  if (shouldReduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-violet-500/15 blur-[140px]" />
        <div className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/6 blur-[100px]" />
        <div className="absolute -left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-violet-400/5 blur-[80px]" />
        <div className="absolute right-[15%] top-[20%] h-16 w-16 rotate-45 rounded-lg border border-violet-500/15" />
        <div className="absolute left-[10%] bottom-[30%] h-10 w-10 rounded-full border border-cyan-400/10 opacity-30" />
        <div className="absolute left-[60%] top-[60%] h-24 w-px bg-gradient-to-b from-transparent via-violet-500/15 to-transparent opacity-20" />
        <div className="absolute right-[30%] bottom-[15%] h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-20" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Large violet blob -- top left */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-violet-500/15 blur-[140px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* Cyan blob -- right */}
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-[120px]"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 90, -40, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* Deep violet blob -- bottom center */}
      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[100px]"
        animate={{
          x: [0, 60, -70, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.25, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* Cyan accent -- subtle top right */}
      <motion.div
        className="absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/6 blur-[100px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* Violet whisper -- bottom left */}
      <motion.div
        className="absolute -left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-violet-400/5 blur-[80px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute right-[15%] top-[20%] h-16 w-16 rotate-45 rounded-lg border border-violet-500/15"
        animate={{ rotate: [45, 90, 45], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const }}
      />
      <motion.div
        className="absolute left-[10%] bottom-[30%] h-10 w-10 rounded-full border border-cyan-400/10"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
      />
      <motion.div
        className="absolute left-[60%] top-[60%] h-24 w-px bg-gradient-to-b from-transparent via-violet-500/15 to-transparent"
        animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
      />
      <motion.div
        className="absolute right-[30%] bottom-[15%] h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        animate={{ scaleX: [0.5, 1.2, 0.5], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
      />
    </div>
  );
}
