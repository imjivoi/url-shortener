import { useSafeValidatedParams, z } from 'h3-zod'

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
  const { data, error } = await client.from('links').select('original_url, id').eq('alias', params.data.alias).single()
  if (data?.original_url) {
    const { error: visitError } = await client.from('link_click').insert([
      {
        link_id: data.id,
      },
    ])

    console.log(visitError)
  }
  return data
})
