import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const getCachedLinkByAlias = cachedFunction(
  async (event: H3Event, alias: string) => {
    const client = supabaseClient(event)
    const { data } = await client.from('links').select().eq('alias', alias).single()

    return data
  },
  {
    name: 'alias',
    getKey: (alias: string) => alias,
  },
)
