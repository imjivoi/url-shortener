import { useSafeValidatedParams, z } from 'h3-zod'

import { createClick, getlinkByAlias } from 'server/model'

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

  const link = await getlinkByAlias(event, params.data.alias)
  if (link?.original_url) {
    await createClick(event, link.id)
  }
  return link
})
