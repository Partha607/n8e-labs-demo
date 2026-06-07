// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// Custom domains on GitHub Pages are served from the site root, not /repo-name/.
const site = process.env.SITE_URL ?? 'https://n8elabs.com';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http", hostname: "localhost" }]
  }
});