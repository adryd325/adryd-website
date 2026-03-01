// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://adryd.com",
  // scopedStyleStrategy: "class",
  vite: {
    ssr: {
      noExternal: ["modern-normalize"],
    },
    css: {
      transformer: "lightningcss",
    },
  },

  image: {
    layout: "constrained",
    breakpoints: [300, 500, 640, 750, 828, 1080, 1280, 1668, 1856, 2048, 2560],
  },

  server: {
    port: 13337,
    allowedHosts: ["adryd.com"],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-dark",
        dark: "github-dark-default",
      },
    },
  },

  devToolbar: {
    enabled: false,
  },

  integrations: [mdx(), sitemap()],

  redirects: {
    "/pages/opennbs-archive": "/pages/2025-12-29-opennbs-archive",
    "/pages/opennbs-archive/opennbs.zip": "/pages/2025-12-29-opennbs-archive/opennbs.zip",
    "/pages/ttc-radio-zones": "/pages/2025-03-11-ttc-radio-zones",
  },
});
