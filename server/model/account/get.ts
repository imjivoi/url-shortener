import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const getCachedAccount = cachedFunction(
  async (event: H3Event, userId: string) => {
    const client = supabaseClient(event)

    const { data } = await client.from('accounts').select().eq('id', userId).single()

    return data
  },
  {
    maxAge: 60 * 10,
    name: 'account',
    getKey: ({ id }) => id,
  },
)
