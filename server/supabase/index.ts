import { createClient } from '@supabase/supabase-js'
import { H3Event } from 'h3'

import { Database } from '../types'

import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'

export const supabaseClient = (event: H3Event) => serverSupabaseClient<Database>(event)
export const serviceRoleClient = (event: H3Event) => serverSupabaseServiceRole<Database>(event)

// export const serviceRoleClient = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
