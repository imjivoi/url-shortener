export default defineNuxtRouteMiddleware(async ({ params }) => {
  const headers = useRequestHeaders(['cookie']) as Record<string, string>
  const response = await $fetch(`/api/url/get-by-token/${params.token}`, {
    method: 'GET',
    headers,
  })
  if (response?.original_url) {
    return await navigateTo(response.original_url, {
      external: true,
    })
  }
})
