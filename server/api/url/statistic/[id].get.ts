import { z, zh } from 'h3-zod'

import { supabaseClient } from 'server/supabase'

export default defineEventHandler(async (event) => {
  const client = supabaseClient(event)
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

  // const {data,error} = await client.from('url_visit').select('')
})
