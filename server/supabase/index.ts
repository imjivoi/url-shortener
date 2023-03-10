import { createClient } from '@supabase/supabase-js'
import { H3Event } from 'h3'

import { Database } from '../types'

import { serverSupabaseClient } from '#supabase/server'

export const supabaseClient = (event: H3Event) => serverSupabaseClient<Database>(event)
