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
        // Neutralna, ciepła baza (kremowa biel + grafit)
        canvas: "#faf8f5",
        ink: {
          DEFAULT: "#2b2a28",
          soft: "#5b5853",
          faint: "#8a857d",
        },
        line: "#e9e4dc",
        // JEDEN akcent — spokojna morsko-zielona (kojarzy się z opieką, nie z transakcją)
        accent: {
          50: "#f0f9f7",
          100: "#d8efea",
          200: "#b2ddd4",
          300: "#82c6b9",
          400: "#52a89a",
          500: "#358d7e",
          600: "#287063",
          700: "#235a51",
          800: "#1f4942",
          900: "#1b3c37",
        },
        info: {
          50: "#f1f6fb",
          100: "#dceaf5",
          600: "#3a6b94",
          700: "#2f567a",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        screenpad: "30rem",
      },
    },
  },
  plugins: [],
};

export default config;
