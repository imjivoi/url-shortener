import { fileURLToPath, URL } from 'url'


const API_URL = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:3000/api/**' 

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  spaLoadingTemplate: false,
  app: {
    head: {
      meta: [
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
      APP_DOMAIN_URL: process.env.NODE_ENV === 'production' ? process.env.APP_DOMAIN_URL : 'localhost:3000',
      SHORT_DOMAIN_URL: process.env.NODE_ENV === 'production' ? process.env.SHORT_DOMAIN_URL : 'localhost:3000',
    },
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_KEY,
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    assets: fileURLToPath(new URL('./assets', import.meta.url)),
    types: fileURLToPath(new URL('./types', import.meta.url)),
  },
  css: ['@/assets/styles/index.scss'],
  modules: [
    'nuxt-svgo',
    'nuxt-icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-viewport',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    // 'nuxt-security',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxt/content',
    // '@zadigetvoltaire/nuxt-gtm',
    'nuxt-gtag',
    '@nuxt/ui',
  ],
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
    // vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    pages: {
      dashboard: false,
    },
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
      },
      // {
      //   code: 'es',
      //   iso: 'es',
      //   name: 'Español',
      // },
    ],
  },
  // security: {
  //   rateLimiter: {
  //     value: {
  //       tokensPerInterval: 150,
  //       interval: 'hour',
  //       fireImmediately: true,
  //     },
  //     route: '/api/links',
  //   },
  //   headers: {
  //     contentSecurityPolicy: false,
  //     crossOriginEmbedderPolicy: false,
  //   },
  // },
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
  hooks: {
    // 'build:before': () => {
    //   z.object({
    //     SUPABASE_URL: z.string(),
    //     SUPABASE_KEY: z.string(),
    //     // SUPABASE_PROJECT_ID: z.string(),
    //     // SUPABASE_ACCESS_TOKEN: z.string(),
    //     DOMAIN_URL: z.string(),
    //     SUPABASE_SERVICE_KEY: z.string(),
    //     CRON_KEY: z.string(),
    //     REDIS_HOST: z.string(),
    //     REDIS_PORT: z.string(),
    //     REDIS_PASSWORD: z.string(),
    //   }).parse(process.env)
    // },
  },
  colorMode: {
    preference: 'light',
  },
  build: {
    transpile: [/echarts/, /zrender/],
  },
  // nitro: {
  //   devProxy: {
  //     '/api/**': 'http://localhost:3000/api/**',
  //   }
  // }
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: API_URL,
      },
    },
    preset: 'vercel'
  },
  // vite: {
  //   server: {
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:3000/api',
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/api/, '')
  //       },
  //     },
  //   },
  // },
})
