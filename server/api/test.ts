import { geolocation } from '@vercel/edge'

export default defineEventHandler((event) => {
  const geo = process.env.NODE_ENV === 'production' ? geolocation(event.node.req) : {}

  console.log(getHeader(event, 'user-agent'))

  return {
    geo,
  }
})
