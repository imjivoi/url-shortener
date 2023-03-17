import { useSafeValidatedParams, z } from 'h3-zod'

import { serviceRoleClient } from 'server/supabase'

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

  const client = serviceRoleClient(event)

  const { data, error } = await client
    .from('links')
    .select('redirect_url, title, description, image_url')
    .eq('alias', params.data.alias)
    .single()

  if (error) {
    throw createError({
      statusCode: 501,
      statusMessage: 'Server error',
    })
  }

  return data
})
