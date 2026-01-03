import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dune: ["var(--font-dune)", "sans-serif"],
        garet: ["var(--font-garet)", "sans-serif"],
      },
      colors: {
        // GDV palettes
        dune: {
          // Mood warm & bright
          bg: "#091722",
          primary: "#eba266",
          accent: "#c55c3d",
          text: "#f7ba73",
        },
        ambient: {
          // Mood ambient & dark
          bg: "#030304",
          primary: "#145362",
          accent: "#260e1f",
          text: "#22344b",
        },
        energetic: {
          // Mood energetic
          bg: "#090101",
          primary: "#e97c12",
          accent: "#ed8b09",
          text: "#ef8414",
        },
      },
      backgroundImage: {
        halftone: "radial-gradient(circle, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;