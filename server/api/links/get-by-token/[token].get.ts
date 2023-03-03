import { useSafeValidatedParams, z } from 'h3-zod'

import { supabaseClient } from 'server/supabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const client = supabaseClient(event)
  const params = useSafeValidatedParams(
    event,
    z.object({
      token: z.string(),
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
  const currentUrl = config.public.DOMAIN_URL + '/' + params.data.token
  const { data, error } = await client.from('links').select('original_url, id').eq('redirect_url', currentUrl).single()
  if (data?.original_url) {
    const { error: visitError } = await client.from('link_click').insert([
      {
        link_stat_id: data.id,
      },
    ])

    console.log(visitError)
  }
  return data
})
