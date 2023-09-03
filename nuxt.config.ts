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
  spaLoadingTemplate: false,
  app: {
    head: {
      meta: [
        {
          name: 'naive-ui-style',
        },
        // {
        //   name: 'description',
        //   content:
        //     'Create custom short links that are perfect for sharing on social media, email, and more - and start seeing results today',
        // },
        // {
        //   name: 'keywords',
        //   content: 'url link shortener short url free analytics sharing',
        // },
        // {
        //   key: 'og:title',
        //   property: 'og:title',
        //   name: 'og:title',
        //   content: 'Simple url shortener',
        // },
        // {
        //   key: 'og:description',
        //   property: 'og:description',
        //   name: 'og:description',
        //   content:
        //     'Create custom short links that are perfect for sharing on social media, email, and more - and start seeing results today',
        // },
        {
          key: 'og:image',
          property: 'og:image',
          name: 'og:image',
          content: '/og-image.png',
        },
        {
          key: 'og:site',
          property: 'og:site',
          content: 'https://liny.app',
        },
        {
          key: 'og:site_name',
          property: 'og:site_name',
          content: 'liny.app',
        },
        {
          key: 'og:type',
          property: 'og:type',
          content: 'website',
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
    // '@zadigetvoltaire/nuxt-gtm',
    'nuxt-gtag',
  ],
  colorMode,
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
    // vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    defaultLocale: 'es',
    pages: {
      dashboard: false,
    },
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
      },
      {
        code: 'es',
        iso: 'es',
        name: 'Español',
      },
    ],
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
  ...(process.env.NODE_ENV === 'production' && {
    gtag: {
      id: 'G-1BZVZS70WX',
    },
  }),
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
    '/supabase/**': {
      proxy: {
        to: 'http://localhost:54323',
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Headers': '*',
        //   'access-control-allow-methods': '*',
        // },
      },
      cors: false,
    },
  },
})
