/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        rokkitt: ["Rokkitt Variable", "ui-serif"],
        kreon: ["Kreon Variable", "ui-serif"],
        work: ["Work Sans Variable", "ui-sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "dracula",
      {
        retro: {
          ...require("daisyui/src/theming/themes")["[data-theme=retro]"],
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
        },
      },
    ],
  },
};
