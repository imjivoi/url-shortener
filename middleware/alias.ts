import { isCrawler } from 'server/lib'

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

    const link = await $fetch<{ original_url: string }>(`/api/storage/${params.alias}`)

    if (!link || !link.original_url) {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    if (!isCrawler(headers['user-agent'])) {
      await navigateTo(link.original_url, {
        external: true,
      })
      try {
        await $fetch('/api/links/statistic/create', {
          method: 'post',
          body: {
            alias: params.alias,
          },
          headers,
        })
      } catch (e) {}
    }
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})
