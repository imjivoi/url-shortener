import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { AccountType } from 'shared/types'

export const updateAccount = async (event: H3Event, userId: string, updateData: Partial<AccountType>) => {
  const client = supabaseClient(event)

  return await client.from('accounts').update(updateData).eq('id', userId).select().single()
}
