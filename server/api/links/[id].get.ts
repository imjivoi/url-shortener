import { useSafeValidatedParams, z, zh } from 'h3-zod'

import { getLinkById } from 'server/model'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }

  const params = zh.useSafeValidatedParams(
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

  const { data, error } = await getLinkById(event, params.data.id)

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }

  return { ...data, clicks: data.clicks && Array.isArray(data.clicks) && data.clicks[0].count }
})
