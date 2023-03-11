import { H3Event } from 'h3'

import { serviceRoleClient } from 'server/supabase'

export const getTotalStatisticByUserId = async (event: H3Event, userId: string) => {
  const client = serviceRoleClient(event)

  const { count: links, error: linksError } = await client
    .from('links')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  const { count: clicks, error: clicksError } = await client
    .from('clicks')
    .select('links!inner()', { count: 'exact', head: true })
    .eq('links.user_id', userId)

  return {
    links,
    clicks,
  }
}
