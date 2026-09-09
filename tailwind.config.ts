import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#FFFFFF",
        surface2: "#F6F8F7",
        border: "#E6EAE8",
        ink: "#10241E",
        muted: "#64748B",
        mint: {
          DEFAULT: "#2E9E48",
          dim: "#E7F5E8",
        },
        cyan: {
          DEFAULT: "#0EA5E9",
          dim: "#E5F4FC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
