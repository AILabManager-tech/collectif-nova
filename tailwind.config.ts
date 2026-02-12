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
        sage: {
          50: "#F4F6F2",
          100: "#E8EBE4",
          200: "#D1D8C9",
          300: "#B3BEA7",
          400: "#9BAB8C",
          500: "#87947A",
          600: "#6B7A5E",
          700: "#556147",
          800: "#3E4733",
          900: "#2A3023",
        },
        terracotta: {
          50: "#FDF5F1",
          100: "#F9E6DC",
          200: "#F0C9B5",
          300: "#E4A78A",
          400: "#D48B6A",
          500: "#C4785B",
          600: "#A85E42",
          700: "#854A34",
          800: "#633727",
          900: "#42251A",
        },
        gold: {
          50: "#FBF8EC",
          100: "#F5EFD2",
          200: "#EBDFA5",
          300: "#E0CF78",
          400: "#D4AF37",
          500: "#B8962E",
          600: "#937724",
          700: "#6E591B",
          800: "#4A3C12",
          900: "#251E09",
        },
        cream: {
          50: "#FFFFFF",
          100: "#FDFCFA",
          200: "#FAF8F5",
          300: "#F5F1EB",
          400: "#F0EBE3",
          500: "#E8E1D5",
          600: "#D4C9B8",
          700: "#B8A98F",
          800: "#9C8A6A",
          900: "#7A6C52",
        },
        charcoal: {
          DEFAULT: "#3D3D35",
          light: "#5A5A50",
          dark: "#2A2A24",
        },
        taupe: "#8B8B80",
      },
      fontFamily: {
        heading: ["var(--font-lora)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
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
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-left": "fade-in-left 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
