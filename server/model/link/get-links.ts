import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const getLinks = async (event: H3Event, userId: string) => {
  const client = supabaseClient(event)

  const { data } = await client.from('links').select().eq('user_id', userId)

  return data
}
