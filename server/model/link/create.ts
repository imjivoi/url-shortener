import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { LinkType } from 'server/types'

export const createLink = async (event: H3Event, userId: string, data: Omit<LinkType, 'id' | 'clicks'>) => {
  const client = supabaseClient(event)

  return await client
    .from('links')
    .insert([{ ...data, user_id: userId }])
    .select()
}
