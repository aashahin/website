// @ts-check
import {defineConfig} from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import icon from 'astro-icon';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    output: "server",
    site: "https://abdelrahman.co",
    devToolbar: {
        enabled: false
    },
    prefetch: {
        defaultStrategy: "viewport",
        prefetchAll: true
    },
    experimental: {
        responsiveImages: true,
        csp: true,
        headingIdCompat: true,
        clientPrerender: true,
    },
    adapter: cloudflare({
        imageService: "compile",
    }),
    integrations: [icon(), react(), markdoc(), keystatic(), sitemap()]
});