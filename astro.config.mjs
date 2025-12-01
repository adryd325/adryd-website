// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://adryd.com",

  vite: {
    ssr: {
      noExternal: ['modern-normalize'],
    },
    css: {
      transformer: "lightningcss",
    },
  },

  image: {
    layout: 'constrained'
  },

  server: {
    port: 13337,
    allowedHosts: ["adryd.com"]
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-dark',
        dark: 'github-dark-default',
      },
    }
  },

  devToolbar: {
    enabled: false,
  },

  integrations: [mdx(), sitemap()]
}
);