import { isCrawler } from '../server/lib'

export default defineNuxtRouteMiddleware(async ({ params }) => {
  if (!process.server) return
  const vercelHeaders = [
    'x-vercel-ip-country',
    'x-vercel-ip-country-region',
    'x-vercel-ip-city',
    'x-vercel-ip-latitude',
    'x-vercel-ip-longitude',
  ]
  try {
    const headers = useRequestHeaders(['cookie', 'x-forwarded-for', 'user-agent', ...vercelHeaders]) as Record<
      string,
      string
    >
    const link = await $fetch<{ original_url: string }>(`/api/links/alias/${params.alias}`)
    const host = useRequestHeaders(['host']).host
    console.log('host', host)

    if (!link || !link.original_url) {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    $fetch(`/api/links/alias/${params.alias}/statistic`, {
      headers,
    }).catch((e) => console.log(e))

    if (!isCrawler(headers['user-agent'])) {
      return navigateTo(link.original_url, { external: true, redirectCode: 301 })
    }
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})
