import { isCrawler } from '../server/lib'

export default defineNuxtRouteMiddleware(async ({ params }) => {
  if (!process.server) return
  const vercelHeaders = [
    'x-vercel-ip-country',
    'x-vercel-ip-country-region',
    'x-vercel-ip-city',
    'x-vercel-ip-latitude',
    'x-vercel-ip-longitude',
    'x-vercel-ip-timezone',
  ]
  console.time('fetch link')
  try {
    const headers = useRequestHeaders(['cookie', 'x-forwarded-for', 'user-agent', ...vercelHeaders]) as Record<
      string,
      string
    >
    const host = useRequestHeader('host')

    const link = await $fetch(`/api/links/domain/${host}/alias/${params.alias}`)
    console.timeEnd('fetch link')

    if (host !== link?.domain || !link.original_url) {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    const event = useNuxtApp().ssrContext?.event
    console.log(event)
    event?.waitUntil($fetch('/api/links/domain/' + host + '/alias/' + params.alias + '/statistic', { headers, method: 'POST' }).catch(
      console.error,
    ))

    if (!isCrawler(headers['user-agent'])) {
      return navigateTo(link.original_url, {
        external: true,
      })
    }
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})
