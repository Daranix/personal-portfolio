import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },
  integrations: [icon({
    include: {
      mdi: ['*']
    }
  }), vue()],
  vite: {
    plugins: [tailwindcss()],
  }
});