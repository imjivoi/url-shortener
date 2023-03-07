// import { geolocation } from '@vercel/edge'

export default defineEventHandler((event) => {
  const cityHeader = event.req.headers['x-vercel-ip-city'] as string
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = event.req.headers['x-forwarded-for'] as string
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'
  return {
    city,
    ip,
  }
})
