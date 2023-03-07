import { geolocation } from '@vercel/edge'

export default defineEventHandler((event) => {
  try {
    const geo = process.env.NODE_ENV === 'production' ? geolocation(event.node.req) : {}

    console.log(getHeader(event, 'user-agent'))

    return {
      geo,
    }
  } catch (error) {
    return {
      error: error?.message,
    }
  }
})
