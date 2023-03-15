import { useSafeValidatedParams, z, useSafeValidatedBody } from 'h3-zod'

import { updateLink } from 'server/model'
import { UpdateLinkScheme } from 'types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }

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

  const body = await useSafeValidatedBody(event, UpdateLinkScheme)

  if (!body.success) {
    const formattedErrors = body.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  const { data, error } = await updateLink(event, params.data.id, body.data)

  if (error) {
    console.log(error)
    throw createError({ statusCode: 500 })
  }
  await useStorage().setItem(`redis:${data.alias}`, { original_url: data.original_url })

  return data
})
