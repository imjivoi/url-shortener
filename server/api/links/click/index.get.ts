import { supabaseClient } from 'server/supabase'
import { TotalLinktatisticType } from 'shared/types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = supabaseClient(event)
  const user = await serverSupabaseUser(event)

  const result: TotalLinktatisticType = {
    links: 0,
    clicks: 0,
  }

  const { data, error } = await client.from('links_users').select('link:links(*)').eq('user_id', user?.id)
  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }

  result.links = data.length

  for await (const item of data) {
    const { data: urlClicks, error: urlClicksError } = await client
      .from('link_click')
      .select('id')
      .eq('link_id', item.link!.id)

    if (urlClicks) {
      result.clicks += urlClicks.length || 0
    }
  }

  return result
})
