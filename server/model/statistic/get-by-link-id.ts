import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { DateRangetype } from 'types'
import { dateRangeConfig } from 'utils'

interface Options {
  dateRange: DateRangetype
}

export const getByLinkId = async (event: H3Event, linkId: string, options?: Options) => {
  const client = supabaseClient(event)

  const dateRange: DateRangetype = options?.dateRange || 'today'

  const from = dateRangeConfig[dateRange].from

  return await client.from('clicks').select().eq('link_id', linkId).gte('created_at', from)
}
