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
        snow: {
          blush: "#FFDDE1",
          red: "#E2707D",
          "red-deep": "#C6455C",
          blue: "#CFE0F5",
          "blue-deep": "#8FA9E0",
          royal: "#44578F",
          sky: "#C9E2F5",
          "sky-deep": "#79A8D8",
          leaf: "#CDEBD3",
          "leaf-deep": "#7FBF8B",
          gold: "#F7DE9C",
          "gold-deep": "#E3B65C",
          cream: "#FFF9EC",
          ink: "#54465E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        script: ["var(--font-script)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        snow: "0 10px 40px -12px rgba(143, 169, 224, 0.35)",
        "snow-lg": "0 20px 60px -15px rgba(198, 69, 92, 0.28)",
        glow: "0 0 30px rgba(247, 222, 156, 0.9)",
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
