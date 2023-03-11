import { H3Event } from 'h3'

import { serviceRoleClient } from '../../supabase'

export const getAllLinks = async (event: H3Event) => {
  const client = serviceRoleClient(event)

  return await client.from('links').select('*, clicks!inner()', { count: 'exact' })
}
