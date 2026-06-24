import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        recipes: resolve(__dirname, 'page/recipes/index.html'),
        privacy: resolve(__dirname, 'page/privacy/index.html'),
        terms: resolve(__dirname, 'page/terms/index.html'),
        quinoaBowl: resolve(__dirname, 'page/recipes/quinoa-bowl/index.html'),
        grilledChicken: resolve(__dirname, 'page/recipes/grilled-chicken/index.html'),
        lentilSalad: resolve(__dirname, 'page/recipes/lentil-salad/index.html'),
      },
    },
  },
});
