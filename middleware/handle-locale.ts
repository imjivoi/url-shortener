export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp()
  const locale = nuxtApp.$i18n.locale.value
  const defaultLocale = nuxtApp.$i18n.defaultLocale
  const localeCodes = nuxtApp.$i18n.locales.value.map((locale) => locale.code)
  const isNotDefaultLocale = localeCodes.includes(to.name as string)

  if (isNotDefaultLocale && locale !== to.name && to.name !== defaultLocale) return navigateTo('/')
  if (to.name === 'index' && locale !== defaultLocale) return navigateTo(`/${locale}`)
})
