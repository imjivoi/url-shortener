import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const getLinkById = async (event: H3Event, id: string) => {
  const client = supabaseClient(event)

  return await client.from('links').select('*').eq('id', id).single()
}
