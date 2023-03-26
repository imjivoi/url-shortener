export default defineNuxtRouteMiddleware(async (to) => {
  const user = await useUser()
  if (to.name?.toString().includes('dashboard') && !user.value) {
    return navigateTo('/')
  }
})
