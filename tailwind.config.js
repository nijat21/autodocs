import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0042ff",

          secondary: "#60a5fa",

          accent: "#86efac",

          neutral: "#111827",

          "base-100": "#1f2937",

          info: "#00d5ff",

          success: "#34d399",

          warning: "#fdba74",

          error: "#fda4af",
        },
      },
    ],
  },
  plugins: [daisyui],
};
