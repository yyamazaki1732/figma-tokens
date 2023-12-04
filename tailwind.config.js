/** @type {import('tailwindcss').Config} */
// import data from "./plugins/editValue.ts";
import variablesData from "./plugins/editVariablesData.js";

module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: () => ({
        text: variablesData.text,
        surface: variablesData.surface,
      }),
    },
  },
  plugins: [],
};
