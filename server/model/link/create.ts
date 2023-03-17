import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { LinkType } from 'types'

export const createLink = async (
  event: H3Event,
  data: Omit<LinkType, 'id' | 'clicks' | 'created_at' | 'updated_at'>,
) => {
  const client = supabaseClient(event)

  return await client
    .from('links')
    .insert([{ ...data }])
    .select()
    .single()
}
