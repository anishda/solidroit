import { defineConfig } from 'astro/config';

// Site statique. En prod, fournir SITE_URL (ex. https://demarches.exemple.fr) au build.
export default defineConfig({
  site: process.env.SITE_URL,
  // Les courriers types sont du texte, pas du code : pas de coloration syntaxique.
  markdown: { syntaxHighlight: false },
});
