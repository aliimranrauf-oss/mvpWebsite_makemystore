import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070B10",
        surface: "#0D131A",
        surface2: "#121A23",
        border: "#1D2833",
        ink: "#E9F1F4",
        muted: "#8FA3AF",
        mint: {
          DEFAULT: "#3CE29A",
          dim: "#1F6B4C",
        },
        cyan: {
          DEFAULT: "#37D0E8",
          dim: "#1B6674",
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
