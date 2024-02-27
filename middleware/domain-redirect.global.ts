export default defineNuxtRouteMiddleware(async (to) => {
  const routeName = to.name
  const {
    public: { appUrl, appDomainUrl },
  } = useRuntimeConfig()
  const host = useRequestHeader('host') || window.location.host

  if (routeName !== 'alias' && host !== appDomainUrl) {
    return navigateTo(appUrl + to.path, { replace: true, redirectCode: 309, external: true })
  }
})
