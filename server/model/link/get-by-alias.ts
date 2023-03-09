import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'
import { LinkType } from 'shared/types'

export const getlinkByAlias = async (event: H3Event, alias: string) => {
  const client = supabaseClient(event)
  let link: LinkType

  link = (await useStorage().getItem(alias)) as LinkType
  if (!link) {
    const { data } = await client.from('links').select().eq('alias', alias).single()

    if (data) {
      link = data
      await useStorage().setItem(alias, data)
    }
  }

  return link
}
