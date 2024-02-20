import * as v from 'valibot'

import { createStatistic } from '../../services'

export default defineWrappedEventHandler(async (event) => {
  const { alias } = await useValidatedParams(event, v.objectAsync({ alias: v.string() }))
  const result = await useStorage().getItem(`redis:${alias}`)

  if (!result?.original_url) {
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Page Not Found' }))
  }
  return sendRedirect(event, result.original_url, 301).then(() => {
    createStatistic(alias)
  })
})
