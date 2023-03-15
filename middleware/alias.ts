export default defineNuxtRouteMiddleware(async ({ params }) => {
  const start = performance.now()

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
    const link = await useStorage().getItem(`redis:${params.alias}`)

    if (link?.original_url) {
      const end = performance.now()
      console.log(`Execution time: ${end - start} ms`)
      $fetch('/api/links/statistic', {
        method: 'post',
        body: {
          alias: params.alias,
        },
        headers,
      })
      return navigateTo(link.original_url, {
        external: true,
      })
    }
  } catch (error) {}

  return navigateTo('/')
})
