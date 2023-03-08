import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const getAccount = async (event: H3Event, userId: string) => {
  const client = supabaseClient(event)

  const { data } = await client.from('accounts').select().eq('id', userId).single()

  return data
}
