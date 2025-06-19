// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import icon from "astro-icon";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://abdelrahman.co",
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  image: {
    responsiveStyles: true,
  },
  experimental: {
    headingIdCompat: true,
    clientPrerender: true,
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [icon(), react(), markdoc(), keystatic(), sitemap()],
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : undefined,
    },
  },
});
