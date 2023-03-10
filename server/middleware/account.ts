import { getAccount } from '../model'

import { serverSupabaseUser } from '#supabase/server'

export default defineCachedEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (user) {
    const { data: account } = await getAccount(event, user.id)
    event.context.account = account
  }
})
