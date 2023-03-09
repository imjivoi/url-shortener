import { useSafeValidatedParams, z } from 'h3-zod'

import { deleteLink } from 'server/model'
export default defineEventHandler(async (event) => {
  const params = useSafeValidatedParams(
    event,
    z.object({
      id: z.string().uuid(),
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

  const { error } = await deleteLink(event, params.data.id)
  console.log(error)
  if (error) {
    throw createError({ statusCode: 500 })
  }
  return ''
})
