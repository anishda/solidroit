import { defineConfig } from 'astro/config';

// Site statique. En prod, fournir SITE_URL (ex. https://demarches.exemple.fr) au build.
export default defineConfig({
  site: process.env.SITE_URL,
});
