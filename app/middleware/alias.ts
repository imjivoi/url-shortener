export default defineNuxtRouteMiddleware(async ({ params }) => {
  try {
    const headers = useRequestHeaders(['cookie']) as Record<string, string>
    const response = await $fetch(`/api/links/alias/${params.alias}`, {
      method: 'GET',
      headers,
    })
    if (response?.original_url) {
      return await navigateTo(response.original_url, {
        external: true,
      })
    }
  } catch (error) {
    console.log(error)
    throw createError(error)
  }

  return navigateTo('/')
})
