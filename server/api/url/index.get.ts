import { supabaseClient } from 'server/supabase'
import { UrlType } from 'shared/types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = supabaseClient(event)

  const result: UrlType[] = []

  const { data, error } = await client.from('urls_users').select('url:urls(*)').eq('user_id', user?.id)
  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }

  for await (const item of data) {
    const { data: urlClicks, error: urlClicksError } = await client
      .from('url_click')
      .select('id')
      .eq('url_stat_id', item.url!.id)

    if (urlClicks) {
      item.url.total_clicks = urlClicks.length
    }
    result.push(item.url)
  }

  return result
})
