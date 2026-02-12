"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blob 1 — sage */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-sage-300/20 blur-[120px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Blob 2 — terracotta */}
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-terracotta-300/15 blur-[100px]"
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 70, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Blob 3 — gold accent */}
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-gold-300/10 blur-[100px]"
        animate={{
          x: [0, 50, -60, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
