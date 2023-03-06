import { useSafeValidatedParams, z } from 'h3-zod'

import { supabaseClient } from 'server/supabase'

export default defineEventHandler(async (event) => {
  const client = supabaseClient(event)

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

  const { error } = await client.from('link').delete().eq('id', params.data.id)
  console.log(error)

  if (error) {
    throw createError({ statusCode: 500 })
  }
  return ''
})
