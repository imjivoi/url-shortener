export default defineNuxtRouteMiddleware(async (to) => {
  const routeName = to.name
  const {
    public: { appDomainUrl },
  } = useRuntimeConfig()
  const host = useRequestHeader('host') || window.location.host

  if (routeName !== 'alias' && host !== appDomainUrl) {
    return navigateTo(appDomainUrl + to.path, { replace: true, redirectCode: 309, external: true })
  }
})
