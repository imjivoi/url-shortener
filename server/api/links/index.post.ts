import { useSafeValidatedBody } from 'h3-zod'

import { getAccount } from 'server/model'
import { supabaseClient } from 'server/supabase'
import { CreateUrlSchema } from 'shared/types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const user = await serverSupabaseUser(event)
  const client = supabaseClient(event)

  const body = await useSafeValidatedBody(event, CreateUrlSchema)

  if (!body.success) {
    const formattedErrors = body.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  const { original_url, title, alias } = body.data

  const { data, error } = await client
    .from('links')
    .insert([
      {
        title,
        original_url,
        redirect_url: config.public.DOMAIN_URL + '/' + alias,
        alias,
        user_id: user!.id,
      },
    ])
    .select('*')
    .single()

  return data
})
