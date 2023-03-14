import { useSafeValidatedQuery, z } from 'h3-zod'

import { deleteLink } from 'server/model'

import { serverSupabaseUser } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }
  const params = useSafeValidatedQuery(
    event,
    z.object({
      id: z.string().uuid(),
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

  const { error } = await deleteLink(event, params.data.id)
  if (error) {
    throw createError({ statusCode: 500 })
  }
  await useStorage('redis').removeItem(`${params.data.alias}`)

  return true
})
