import { z, useSafeValidatedBody } from 'h3-zod'

import { createClick, getAccount, getLinkByAlias } from 'server/model'
/**
 * TODO: сделать логгирование
 */
export default defineEventHandler(async (event) => {
  const body = await useSafeValidatedBody(
    event,
    z.object({
      alias: z.string(),
    }),
  )

  if (!body.success) {
    const formattedErrors = body.error.format()
    return
  }
  const link = await getLinkByAlias(event, body.data.alias)
  if (link) {
    const account = await getAccount(event, link.user_id)
    if (!account?.clicks_limit_exceeded) {
      await createClick(event, link.id)
    }
  }
})
