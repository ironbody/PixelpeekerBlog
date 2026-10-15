import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  integrations: [
    expressiveCode({
      // the first theme is the default, and the media query covers "auto" mode
      themes: ["catppuccin-latte", "dracula"],
      useDarkModeMediaQuery: true,
      // match the data-theme values set by ToggleTheme
      themeCssSelector: (theme) =>
        `[data-theme='${theme.type === "dark" ? "dracula" : "lilac"}']`,
      // daisyUI's color variables follow the site theme,
      // so these work in both modes
      styleOverrides: {
        codeFontSize: "1rem",
        codeBackground: "var(--color-base-200)",
        borderColor: "var(--color-base-300)",
        frames: {
          editorTabBarBackground: "var(--color-base-300)",
          editorActiveTabBackground: "var(--color-base-200)",
          editorActiveTabIndicatorTopColor: "var(--color-primary)",
          terminalTitlebarBackground: "var(--color-base-300)",
          terminalBackground: "var(--color-base-200)",
        },
        textMarkers: {
          // [dark, light]: softer markers in light mode
          defaultLuminance: ["32%", "88%"],
          defaultChroma: ["40", "25"],
        },
      },
    }),
    react(),
    icon(),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        // Astro adds heading ids after user plugins,
        // so add them early for autolinking
        rehypeHeadingIds,
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: ["heading-link"] } },
        ],
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    }),
  },
  prefetch: true,
  output: "static",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
