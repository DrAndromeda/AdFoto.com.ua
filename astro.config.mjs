import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE / BASE are overridable so the same build works on SherlockHost (root) and GitHub Pages (subpath).
const site = process.env.SITE_URL || 'https://adfoto.com.ua';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'ru', locales: { ru: 'ru-UA', uk: 'uk-UA', en: 'en' } },
    }),
  ],
});
