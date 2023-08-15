import { z } from 'zod'

import { fileURLToPath, URL } from 'url'

import { colorMode } from './lib'

const redisStorage = {
  driver: 'redis',
  tls: true,
  host: process.env.REDIS_HOST as string,
  port: process.env.REDIS_PORT as string,
  password: process.env.REDIS_PASSWORD as string,
  url: process.env.REDIS_URL as string,
}

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
      DOMAIN_URL: process.env.NODE_ENV === 'production' ? process.env.DOMAIN_URL : 'http://localhost:4444',
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
    '@vueuse/nuxt',
    'nuxt-viewport',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    'nuxt-security',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxt/content',
  ],
  colorMode,
  i18n: {
    vueI18n: './lib/i18n',
  },
  security: {
    rateLimiter: {
      value: {
        tokensPerInterval: 150,
        interval: 'hour',
        fireImmediately: true,
      },
      route: '/api/links',
    },
    headers: {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    },
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/styles/tailwind.css',
  },
  robots: {
    rules: {
      UserAgent: '*',
      BlankLine: true,
      Sitemap: `https://liny.app/sitemap.xml`,
    },
  },
  sitemap: {
    hostname: 'https://liny.app',

    exclude: ['/dashboard', '/dashboard/**', '/auth', '/blog'],
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
      redis: redisStorage,

      cache: {
        driver: 'lruCache',
        ttl: 60 * 5,
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
        REDIS_HOST: z.string(),
        REDIS_PORT: z.string(),
        REDIS_PASSWORD: z.string(),
      }).parse(process.env)
    },
  },
  routeRules: {
    dashboard: {
      ssr: false,
    },
    '/dashboard/**': {
      ssr: false,
    },
  },
})
