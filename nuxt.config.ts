import { fileURLToPath, URL } from 'url'

import { i18n, colorMode } from './shared/lib'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      DOMAIN_URL: process.env.DOMAIN_URL,
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    shared: fileURLToPath(new URL('./shared', import.meta.url)),
    app: fileURLToPath(new URL('./app', import.meta.url)),
    features: fileURLToPath(new URL('./features', import.meta.url)),
    entities: fileURLToPath(new URL('./entities', import.meta.url)),
    assets: fileURLToPath(new URL('./app/assets', import.meta.url)),
    server: fileURLToPath(new URL('./server', import.meta.url)),
  },
  imports: { dirs: ['./shared/ui', './shared/composables'] },
  dir: {
    layouts: './shared/layouts',
    middleware: './app/middleware',
    public: './app/public',
  },
  components: {
    dirs: [{ path: './shared/ui', prefix: 'shared-ui' }],
  },
  css: ['~/app/styles/index.scss'],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    'nuxt-icon',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-typed-router',
    '@vueuse/nuxt',
    'nuxt-viewport',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  colorMode,
  i18n,
})
