import { H3Event } from 'h3'

import { serviceRoleClient } from 'server/supabase'
import { AccountType } from 'types'

export const updateAccount = async (event: H3Event, userId: string, updateData: Partial<AccountType>) => {
  const client = serviceRoleClient(event)

  return await client.from('accounts').update(updateData).eq('id', userId).select().single()
}
