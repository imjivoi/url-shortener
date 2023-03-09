import { getAccount } from 'server/model'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }
  const { data, error } = await getAccount(event, user.id)

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }

  return data
})
