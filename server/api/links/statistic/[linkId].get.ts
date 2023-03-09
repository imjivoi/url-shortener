import { z, zh } from 'h3-zod'

import { getByLinkId } from 'server/model'

export default defineEventHandler(async (event) => {
  const params = zh.useSafeValidatedParams(
    event,
    z.object({
      linkId: z.string().uuid(),
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

  const { data, error } = await getByLinkId(event, params.data.linkId)

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }

  return data
})
