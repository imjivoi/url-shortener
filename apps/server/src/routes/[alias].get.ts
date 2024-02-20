import * as v from 'valibot'
import { createStatistic, getLinkByAlias } from '../services'
import { isCrawler } from '../lib'

export default eventHandler(async (event) => {
  const { alias } = await useValidatedParams(event, v.objectAsync({ alias: v.string() }))

  let link = await useStorage().getItem(`redis:${alias}`)

  const { APP_DOMAIN_URL } = useRuntimeConfig()

  if (!link) {
    link = await getLinkByAlias(alias)
    await useStorage().setItem(`redis:${alias}`, link)
  }

  if (link?.original_url) {
    createStatistic(alias).catch(console.error)

    if (isCrawler(getHeader(event, 'user-agent'))) {
      return sendRedirect(event, APP_DOMAIN_URL + '/' + alias, 301)
    }

    return sendRedirect(event, link.original_url, 301)
  }

  return sendError(event, createError({ statusCode: 404, statusMessage: 'Not found' }))
})
