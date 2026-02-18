"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Project data — 4 fictional projects                               */
/* ------------------------------------------------------------------ */

const PROJECT_KEYS = ["branding", "website", "social", "identity"] as const;
type ProjectKey = (typeof PROJECT_KEYS)[number];

/** Gradient backgrounds for project placeholders */
const PROJECT_GRADIENTS: Record<ProjectKey, string> = {
  branding: "from-[#7B61FF]/40 to-[#00E5CC]/20",
  website: "from-[#00E5CC]/40 to-[#7B61FF]/20",
  social: "from-[#7B61FF]/30 via-[#00E5CC]/30 to-[#7B61FF]/20",
  identity: "from-[#00E5CC]/30 via-[#7B61FF]/30 to-[#00E5CC]/20",
};

/** Icon per project type */
const PROJECT_ICONS: Record<ProjectKey, React.ReactNode> = {
  branding: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  website: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  social: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  identity: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Project Card with 3D tilt effect                                  */
/* ------------------------------------------------------------------ */

interface ProjectCardProps {
  projectKey: ProjectKey;
  isActive: boolean;
  onClick: () => void;
  title: string;
  category: string;
  prefersReduced: boolean;
}

function ProjectCard({
  projectKey,
  isActive,
  onClick,
  title,
  category,
  prefersReduced,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      setTilt({ rotateX, rotateY });
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isActive
          ? "border-[#7B61FF] shadow-[0_0_30px_rgba(123,97,255,0.3)]"
          : "border-[#F0F0F5]/10 hover:border-[#7B61FF]/40"
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Gradient placeholder */}
      <div
        className={`flex h-48 items-center justify-center bg-gradient-to-br ${PROJECT_GRADIENTS[projectKey]} bg-[#1A1A2E]`}
      >
        <div className="text-[#F0F0F5]/60 transition-colors group-hover:text-[#7B61FF]">
          {PROJECT_ICONS[projectKey]}
        </div>
      </div>

      {/* Card info */}
      <div className="bg-[#1A1A2E] p-5">
        <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-widest text-[#00E5CC]">
          {category}
        </span>
        <h3 className="font-heading text-lg font-bold text-[#F0F0F5]">
          {title}
        </h3>
      </div>

      {/* Active glow overlay */}
      {isActive && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-[#7B61FF]/50" />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Before/After Slider for active project                            */
/* ------------------------------------------------------------------ */

interface BeforeAfterSliderProps {
  projectKey: ProjectKey;
  beforeLabel: string;
  afterLabel: string;
}

function BeforeAfterSlider({
  projectKey,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-80 w-full cursor-ew-resize overflow-hidden rounded-2xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Before/After comparison"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 5));
      }}
    >
      {/* "Before" side */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#141414]">
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold text-[#F0F0F5]/20 font-heading">
            {beforeLabel}
          </div>
          <div className="h-20 w-40 rounded-lg border-2 border-dashed border-[#F0F0F5]/10" />
        </div>
      </div>

      {/* "After" side — clipped */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-[#1A1A2E]"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="text-center">
          <div
            className={`mb-2 bg-gradient-to-r text-4xl font-bold font-heading bg-clip-text text-transparent ${PROJECT_GRADIENTS[projectKey]} from-[#7B61FF] to-[#00E5CC]`}
          >
            {afterLabel}
          </div>
          <div className="h-20 w-40 rounded-lg bg-gradient-to-br from-[#7B61FF]/30 to-[#00E5CC]/30" />
        </div>
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-[#F0F0F5]/80"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F0F0F5]/80 bg-[#0D0D0D] shadow-lg">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F0F0F5"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="8,4 4,12 8,20" />
            <polyline points="16,4 20,12 16,20" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * ProjectShowcase3D — Portfolio showcase with 3D tilt cards and
 * a before/after comparison slider for the active project.
 *
 * @component
 * @example
 * ```tsx
 * <ProjectShowcase3D />
 * ```
 */
export function ProjectShowcase3D() {
  const t = useTranslations("home.showcase");
  const prefersReduced = useReducedMotion() ?? false;
  const [activeProject, setActiveProject] = useState<ProjectKey>("branding");

  return (
    <section id="project-showcase" className="bg-[#0D0D0D] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-[#F0F0F5] lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl font-body text-[#F0F0F5]/60">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Project cards grid */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" as const }}
          className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {PROJECT_KEYS.map((key) => (
            <ProjectCard
              key={key}
              projectKey={key}
              isActive={activeProject === key}
              onClick={() => setActiveProject(key)}
              title={t(`projects.${key}.title`)}
              category={t(`projects.${key}.category`)}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>

        {/* Before/After slider for active project */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeInOut" as const }}
          >
            <div className="mb-4 text-center">
              <span className="inline-block rounded-full bg-[#7B61FF]/10 px-4 py-1.5 text-sm font-semibold text-[#7B61FF]">
                {t(`projects.${activeProject}.category`)}
              </span>
            </div>
            <BeforeAfterSlider
              projectKey={activeProject}
              beforeLabel={t("before_label")}
              afterLabel={t("after_label")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
