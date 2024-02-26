export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name?.toString().includes('dashboard')) {
    const user = await useUser()

    if (!user.value) return navigateTo('/auth/login')
  }
})
