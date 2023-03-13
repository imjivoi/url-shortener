import { supabaseClient } from 'server/supabase'
import { TotalLinkStatisticType } from 'server/types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = supabaseClient(event)
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }

  const result: TotalLinkStatisticType = {
    links: 0,
    clicks: 0,
  }

  const { count: linkCount, error } = await client
    .from('links')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user?.id)
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
  result.links = linkCount || 0

  const { count: clickCount, error: clickCountError } = await client
    .from('clicks')
    .select('links!inner(user_id)', { count: 'exact', head: true })
    .eq('links.user_id', user?.id)

  result.clicks = clickCount || 0
  return result
})
