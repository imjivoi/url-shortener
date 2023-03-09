import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const getByLinkId = async (event: H3Event, linkId: string) => {
  const client = supabaseClient(event)

  return await client.from('clicks').select().eq('link_id', linkId)
}
