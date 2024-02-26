import { consola, createConsola } from 'consola'

const logger = createConsola({
  level: 3,
  reporters: [
    {
      log: (logObj) => {
        console.log(`🟢 ${logObj.args[0]}-${logObj.date}`)
      },
    },
  ],
})

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('afterResponse', async (event, request) => {
    const host = getHeader(event, 'host')
    const status = getResponseStatus(event)
    const path = getRequestPath(event)
    const params = getRouterParams(event)
    if (status === 302) {
      const alias = params._
      if (alias) {
        const url = getRequestURL(event)
        const headers = getRequestHeaders(event)
        await $fetch('/api/links/domain/' + host + '/alias/' + alias + '/statistic', { headers, method: 'POST' })
        logger.success(`Wrote statistic for  ${url.href}`)
      }
    }
  })
})
