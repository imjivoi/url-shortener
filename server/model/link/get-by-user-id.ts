import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

interface Options {
  from?: number
  to?: number
  order?: 'ASC' | 'DESC'
  head?: boolean
}

export const getLinksByUserId = async (event: H3Event, userId: string, options?: Options) => {
  const from = options?.from || 0
  const to = options?.to || 100
  const order = options?.order || 'DESC'
  const head = options?.head

  const client = supabaseClient(event)

  return await client
    .from('links')
    .select('*, clicks(id)', { count: 'exact', head })
    .eq('user_id', userId)
    .order('created_at', { ascending: order === 'ASC' })
    .range(from, to)
}
