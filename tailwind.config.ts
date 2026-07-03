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
        fairy: {
          pink: "#FFD6E8",
          "pink-deep": "#F7A8C9",
          rose: "#E4739E",
          lavender: "#E2D4F5",
          purple: "#B79CE0",
          "purple-deep": "#8E6BBF",
          blue: "#C5E8F2",
          "blue-deep": "#8FD3E8",
          mint: "#CDF2E4",
          "mint-deep": "#8FE0C5",
          cream: "#FFF8E1",
          butter: "#FCEEB5",
          ink: "#6B5876",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        script: ["var(--font-script)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        fairy: "0 10px 40px -12px rgba(183, 156, 224, 0.35)",
        "fairy-lg": "0 20px 60px -15px rgba(228, 115, 158, 0.3)",
        glow: "0 0 30px rgba(255, 214, 232, 0.8)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(-6deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
