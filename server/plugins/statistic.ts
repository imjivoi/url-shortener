import { DEFAULT_DOMAINS } from '../constants'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('afterResponse', async (event, request) => {
    const host = getHeader(event, 'host')
    const status = getResponseStatus(event)
    const path = event.context.matchedRoute.path
    const params = getRouterParams(event)
    const url = getRequestURL(event)
    if (path === '/**' && [200, 302].includes(status)) {
      const alias = params._
      if (alias) {
        const headers = getRequestHeaders(event)
        await $fetch('/api/links/domain/' + host + '/alias/' + alias + '/statistic', { headers, method: 'POST' })
      }
    }
  })
})
