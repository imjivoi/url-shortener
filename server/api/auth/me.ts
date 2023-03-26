import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler((event) => {
  return serverSupabaseUser(event)
})
