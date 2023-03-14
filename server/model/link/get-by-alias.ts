import { H3Event } from 'h3'

import { serviceRoleClient } from 'server/supabase'

export const getCachedLinkByAlias = cachedFunction(
  async (event: H3Event, alias: string) => {
    const client = serviceRoleClient(event)
    const { data } = await client.from('links').select().eq('alias', alias).single()

    return data
  },
  {
    name: 'alias',
    getKey: ({ alias }) => alias,
  },
)
