// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = isGithubActions && repoName ? `/${repoName}` : '/';
const site = isGithubActions && repoOwner ? `https://${repoOwner}.github.io` : undefined;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http", hostname: "localhost" }]
  }
});