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
  try {
    const headers = useRequestHeaders(['cookie', 'x-forwarded-for', 'user-agent', ...vercelHeaders]) as Record<
      string,
      string
    >
    const host = useRequestHeader('host')

    const link = await $fetch(`/api/links/domain/${host}/alias/${params.alias}`)

    if (host !== link?.domain || !link.original_url) {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    const event = useNuxtApp().ssrContext?.event!

    event?.waitUntil(
      $fetch('/api/links/domain/' + host + '/alias/' + params.alias + '/statistic', { headers, method: 'POST' }).catch(
        console.error,
      ),
    )
    const isLinkOlderThan2Days = new Date(link.created_at).getTime() < Date.now() - 2 * 24 * 60 * 60 * 1000
    if (!isCrawler(headers['user-agent'])) {
      // Check if ads have been viewed today
      const adsViewedCookie = useCookie('ads-viewed', {
        path: '/',
        maxAge: 86400, // 24 hours
      })
      const currentDate = new Date().toDateString()
      // If ads haven't been viewed today, redirect to ads page
      if (adsViewedCookie.value !== currentDate) {
        // Set cookie to mark ads as viewed for today
        adsViewedCookie.value = currentDate

        // Only redirect to ads page if not already on the ads page and the link is older than 2 days
        if (!useRoute().path.endsWith('/ads') && isLinkOlderThan2Days) {
          return navigateTo(`/${params.alias}/ads`)
        }
      }

      return navigateTo(link.original_url, {
        external: true,
      })
    }
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})
