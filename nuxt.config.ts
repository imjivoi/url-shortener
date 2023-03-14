import { z } from 'zod'

import { fileURLToPath, URL } from 'url'

import { i18n, colorMode } from './lib'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Simple url shortener',
      meta: [
        {
          name: 'naive-ui-style',
        },
        {
          name: 'description',
          content:
            'Create custom short links that are perfect for sharing on social media, email, and more - and start seeing results today',
        },
        {
          name: 'keywords',
          content: 'url link shortener short url free analytics sharing',
        },
      ],

      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
          rel: 'stylesheet',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap',
          rel: 'stylesheet',
        },
      ],
    },
  },

  runtimeConfig: {
    cronKey: process.env.CRON_KEY,
    public: {
      DOMAIN_URL: process.env.DOMAIN_URL,
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    assets: fileURLToPath(new URL('./assets', import.meta.url)),
    server: fileURLToPath(new URL('./server', import.meta.url)),
    types: fileURLToPath(new URL('./types', import.meta.url)),
    utils: fileURLToPath(new URL('./utils', import.meta.url)),
  },
  css: ['~/assets/styles/index.scss'],
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
    'nuxt-security',
  ],
  colorMode,
  i18n,
  security: {
    rateLimiter: {
      value: {
        tokensPerInterval: 150,
        interval: 'hour',
        fireImmediately: true,
      },
      route: '/api/links',
    },
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/styles/tailwind.css',
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === 'development' ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone'] : [],
    },
  },
  nitro: {
    storage: {
      // redis: {
      //   driver: 'redis',
      //   /* redis connector options */
      //   port: 6379, // Redis port
      //   host: '127.0.0.1', // Redis host
      //   username: '', // needs Redis >= 6
      //   password: '',
      //   db: 0, // Defaults to 0
      //   tls: {}, // tls/ssl
      //   ttl: 600,
      // },
      cache: {
        driver: 'redis',
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        db: 0, // Defaults to 0
        tls: {}, // tls/ssl
        maxAge: 60 * 5,
      },
    },
  },
  hooks: {
    'build:before': () => {
      z.object({
        SUPABASE_URL: z.string(),
        SUPABASE_KEY: z.string(),
        // SUPABASE_PROJECT_ID: z.string(),
        // SUPABASE_ACCESS_TOKEN: z.string(),
        DOMAIN_URL: z.string(),
        SUPABASE_SERVICE_KEY: z.string(),
        CRON_KEY: z.string(),
      }).parse(process.env)
    },
  },
  routeRules: {
    '/dashboard': {
      ssr: false,
    },
    '/dashboard/**': {
      ssr: false,
    },
  },
})
