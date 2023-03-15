import { useSafeValidatedParams, z } from 'h3-zod'

import { createClick, getAccount, getLinkByAlias } from 'server/model'

export default defineEventHandler(async (event) => {
  const params = useSafeValidatedParams(
    event,
    z.object({
      alias: z.string(),
    }),
  )
  if (!params.success) {
    const formattedErrors = params.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  let link = await useStorage().getItem(`redis:${params.data.alias}`)
  if (!link) {
    link = await getLinkByAlias(event, params.data.alias)
    if (link) {
      await useStorage().setItem(`redis:${params.data.alias}`, link)
    }
  }
  if (link?.original_url) {
  }
  return link
})
