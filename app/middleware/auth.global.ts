export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (to.name?.toString().includes('app') && !user.value) {
    return navigateTo('/')
  }
})
