const redisStorage = {
  driver: 'redis',
  tls: true,
  host: process.env.REDIS_HOST as string,
  port: process.env.REDIS_PORT as string,
  password: process.env.REDIS_PASSWORD as string,
  url: process.env.REDIS_URL as string,
}

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'src',
  runtimeConfig: {
    cronKey: process.env.CRON_KEY,
    APP_DOMAIN_URL: process.env.NODE_ENV === 'production' ? process.env.APP_DOMAIN_URL : 'localhost:4444',
    SHORT_DOMAIN_URL: process.env.NODE_ENV === 'production' ? process.env.SHORT_DOMAIN_URL : 'localhost:3000',
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_KEY,
    },
  },
  storage: {
    redis: redisStorage,
  },
  devStorage: {
    redis: {
      driver: 'fs',
      base: './.data/db',
    },
  },
  experimental: {
    asyncContext: true,
  },
  preset: 'vercel',
  routeRules: {},
})
