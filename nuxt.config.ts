import { fileURLToPath, URL } from 'url'

import { i18n, colorMode } from './shared/lib'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
          rel: 'stylesheet',
        },
      ],
    },
    
  },
  
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
    widgets: fileURLToPath(new URL('./widgets', import.meta.url)),
  },
  imports: { dirs: ['shared/ui', 'shared/composables'] },
  dir: {
    layouts: './shared/layouts',
    middleware: './app/middleware',
    public: './app/public',
    plugins: './app/plugins',
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
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  colorMode,
  i18n,
  build: {
    transpile: ['vue-toastification', 'equal-vue'],
  },
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        /* redis connector options */
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        username: '', // needs Redis >= 6
        password: '',
        db: 0, // Defaults to 0
        tls: {}, // tls/ssl
      },
    },
  },
})
