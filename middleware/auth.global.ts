export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (to.name?.toString().includes('dashboard') && !user.value) {
    return navigateTo('/')
  }
})
