import { useSafeValidatedBody } from 'h3-zod'

import { createLink, getAccount, getLinksByUserId, updateAccount } from 'server/model'
import { supabaseClient } from 'server/supabase'
import { CreateUrlSchema } from 'shared/types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }
  const config = useRuntimeConfig()

  const body = await useSafeValidatedBody(event, CreateUrlSchema)

  if (!body.success) {
    const formattedErrors = body.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  const { data: account } = await getAccount(event, user.id)
  if (account?.links_limit_exceeded) {
    throw createError({
      statusCode: 405,
      statusMessage: 'Links limit exceeded',
    })
  }

  const { original_url, title, alias } = body.data

  const { data, error } = await createLink(event, user.id, {
    title,
    original_url,
    redirect_url: config.public.DOMAIN_URL + '/' + alias,
    alias,
  })

  return data
})
