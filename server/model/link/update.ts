import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { UpdateLinktype } from 'types'

export const updateLink = async (event: H3Event, linkId: string, data: UpdateLinktype) => {
  const client = supabaseClient(event)

  return await client.from('links').update(data).eq('id', linkId).select().single()
}
