import type { Config } from "tailwindcss";

// ACTIVE ISLAND DESIGN SYSTEM
// Restrained tropical-editorial palette. Use ocean/lagoon sparingly (nav, headings,
// buttons, key sections) against mostly white/coral-white backgrounds — do not tint
// every section blue. See brief section 7 for rationale.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ocean-deep": "#073B4C",
        lagoon: "#0E7490",
        "island-sand": "#E9D8A6",
        "coral-white": "#FAFAF7",
        "dark-text": "#102A2E",
        "natural-green": "#426B5A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(7, 59, 76, 0.25)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
