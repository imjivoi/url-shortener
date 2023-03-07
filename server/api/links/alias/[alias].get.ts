import { useSafeValidatedParams, z } from 'h3-zod'

import { createClick } from 'server/model'
import { supabaseClient } from 'server/supabase'

export default defineEventHandler(async (event) => {
  const client = supabaseClient(event)
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

  const { data, error } = await client.from('link').select('original_url, id').eq('alias', params.data.alias).single()
  if (data?.original_url) {
    await createClick(event, data.id)
  }
  return data
})
