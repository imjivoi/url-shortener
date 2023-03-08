export default defineNuxtRouteMiddleware(async ({ params }) => {
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
    const response = await $fetch(`/api/links/alias/${params.alias}`, {
      method: 'GET',
      headers,
    })
    if (response?.original_url) {
      return await navigateTo(response.original_url, {
        external: true,
      })
    }
  } catch (error) {}

  return navigateTo('/')
})
