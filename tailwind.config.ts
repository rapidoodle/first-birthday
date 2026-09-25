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
          blush: "#F8C56A",
          red: "#F47D32",
          "red-deep": "#9F3518",
          blue: "#B7D96B",
          "blue-deep": "#3F7B32",
          royal: "#1E5A3D",
          sky: "#DCEBB9",
          "sky-deep": "#477D39",
          leaf: "#B9D9A2",
          "leaf-deep": "#2E7040",
          gold: "#F6B73C",
          "gold-deep": "#A76108",
          cream: "#FFF8DC",
          ink: "#153426",
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
