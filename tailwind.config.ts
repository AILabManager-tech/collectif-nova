import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NEXOS: Palette industrielle — HR Factory / L'Usine RH
        sage: {
          // Remappé → Vert sécurité chantier
          50: "#EEF3F0",
          100: "#D5E5DC",
          200: "#ABCBB9",
          300: "#81B196",
          400: "#5A9775",
          500: "#4A7C59",
          600: "#3D6347",
          700: "#2F4A36",
          800: "#213126",
          900: "#141D16",
        },
        terracotta: {
          // Remappé → Rouille / Brique industrielle
          50: "#F9F0EE",
          100: "#EDDBD5",
          200: "#D9B7AB",
          300: "#C59381",
          400: "#B16F57",
          500: "#A0522D",
          600: "#8B4513",
          700: "#6A340F",
          800: "#4A230A",
          900: "#291306",
        },
        gold: {
          // Remappé → Cuivre oxydé
          50: "#FBF4EE",
          100: "#F5E5D5",
          200: "#EBCBAB",
          300: "#E1B181",
          400: "#D79757",
          500: "#B87333",
          600: "#A0632B",
          700: "#7A4C21",
          800: "#543517",
          900: "#2E1E0D",
        },
        cream: {
          // Remappé → Blanc cassé / Gris ciment
          50: "#FFFFFF",
          100: "#F0EDE8",
          200: "#E1DBD1",
          300: "#D2C9BA",
          400: "#C3B7A3",
          500: "#9C9690",
          600: "#7D7A75",
          700: "#5E5C5A",
          800: "#3F3E3D",
          900: "#201F1F",
        },
        charcoal: {
          // Béton anthracite
          DEFAULT: "#2C2C2C",
          light: "#3A3632",
          dark: "#1A1A1A",
        },
        taupe: "#9C9690",
        teal: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
        },
        violet: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
      },
      fontFamily: {
        // NEXOS: Typographie industrielle
        heading: ["var(--font-oswald)", "var(--font-bebas-neue)", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-left": "fade-in-left 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(135,148,122,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(135,148,122,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
