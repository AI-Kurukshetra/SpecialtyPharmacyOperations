import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* WCAG AA: primary text ≥4.5:1 on white/light bg */
        ink: "#0F172A",
        slate: "#334155",
        muted: "#475569",
        cloud: "#F8FAFC",
        shell: "#FFFFFF",
        brand: "#0D5C55",
        brandDark: "#0A4943",
        accent: "#2DD4BF",
        border: "#CBD5E1",
        success: "#15803D",
        warning: "#B45309",
        error: "#B91C1C",
      },
      boxShadow: {
        panel: "0 20px 45px rgba(22, 50, 74, 0.10)",
        soft: "0 10px 24px rgba(22, 50, 74, 0.06)",
      },
      backgroundImage: {
        "soft-grid":
          "linear-gradient(rgba(15, 118, 110, 0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 118, 110, 0.018) 1px, transparent 1px)",
      },
      outlineWidth: {
        focus: "2px",
      },
      outlineOffset: {
        focus: "2px",
      },
      ringColor: {
        focus: "var(--rx-focus)",
        "focus-subtle": "var(--rx-focus-ring)",
      },
    },
  },
  plugins: [],
};

export default config;
