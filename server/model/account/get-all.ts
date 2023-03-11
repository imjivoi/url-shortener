import { H3Event } from 'h3'

import { serviceRoleClient } from 'server/supabase'

export const getAllAccounts = async (event: H3Event, fields = '*') => {
  const client = serviceRoleClient(event)

  return await client.from('accounts').select(fields)
}
