import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

import { getLinkById } from '.'

export const deleteLink = async (event: H3Event, id: string) => {
  const client = supabaseClient(event)
  const { data, error } = await getLinkById(event, id)

  if (data) {
    return await client.from('links').delete().eq('id', id)
  }
  throw createError({
    statusCode: 404,
    statusMessage: 'Link not found',
  })
}
