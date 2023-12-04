/** @type {import('tailwindcss').Config} */
import data from "./plugins/editTokensData";
import variablesData from "./plugins/editVariablesData";

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
