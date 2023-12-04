import type { Config } from "tailwindcss";
import data from "./plugins/editValue.ts";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: () => ({
        text: data.theme.colors.text as any,
        surface: data.theme.colors.surface as any,
      }),
    },
  },
  plugins: [],
} satisfies Config;
