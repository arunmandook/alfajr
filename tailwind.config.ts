import type { Config } from "tailwindcss";
import { clientConfig } from "./config/client.config";

const { colors, fonts, radius } = clientConfig.theme;

/**
 * Tailwind reads brand tokens straight from config/client.config.ts.
 *
 *  - Colors are exposed BOTH as static hex (so `bg-primary` works without any
 *    runtime setup) AND mapped to CSS variables in app/globals.css, so a client
 *    could later theme at runtime (e.g. a CMS-driven palette) without a rebuild.
 *  - Fonts reference CSS variables that app/layout.tsx wires up via next/font,
 *    using the family names declared in the config as the human-readable source.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.primary,
          fg: "#FFFFFF",
        },
        secondary: {
          DEFAULT: colors.secondary,
          fg: "#FFFFFF",
        },
        accent: {
          DEFAULT: colors.accent,
          fg: "#FFFFFF",
        },
        neutral: colors.neutral ?? "#64748B",
        background: colors.background ?? "#FFFFFF",
        foreground: colors.foreground ?? "#0F172A",
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      fontFamily: {
        // var(--font-*) are defined in app/layout.tsx via next/font.
        heading: ["var(--font-heading)", fonts.heading, "system-ui", "sans-serif"],
        body: ["var(--font-body)", fonts.body, "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", fonts.arabic, "system-ui", "sans-serif"],
        sans: ["var(--font-body)", fonts.body, "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: {
          none: "0px",
          sm: "0.25rem",
          md: "0.5rem",
          lg: "0.75rem",
          xl: "1rem",
          full: "9999px",
        }[radius],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1280px" },
      },
      keyframes: {
        // Mirrors the source site: "fu" (fade-up) and "fi" (fade-in).
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp .8s ease both",
        "fade-in": "fadeIn 1.2s ease both",
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
