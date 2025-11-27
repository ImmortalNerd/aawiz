import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2754A7",
        primaryHover: "#1C3E7A",
        secondary: "#69aaff",
        background: "#adc3ec",
        ghost: "#919eab14",
        darkBg: "#141A21",
      },
      boxShadow: {
        custom:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
