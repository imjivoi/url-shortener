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

    const link = await $fetch(`/api/links/alias/${params.alias}`)

    if (!link) {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    if (link?.original_url) {
      const end = performance.now()
      console.log(`Execution time: ${end - start} ms`)

      await navigateTo(link.original_url, {
        external: true,
      })
      // await useFetch('/api/links/statistic/create', {
      //   method: 'post',
      //   body: {
      //     alias: params.alias,
      //   },
      //   headers,
      // })
    }
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})
