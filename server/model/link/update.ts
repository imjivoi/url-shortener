import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { UpdateLinktype } from 'types'

export const updateLink = async (event: H3Event, linkId: string, data: UpdateLinktype) => {
  const config = useRuntimeConfig()
  const client = supabaseClient(event)

  return await client
    .from('links')
    .update({
      ...data,
      ...(data.alias && { redirect_url: config.public.DOMAIN_URL + '/' + data.alias }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', linkId)
    .select()
    .single()
}
