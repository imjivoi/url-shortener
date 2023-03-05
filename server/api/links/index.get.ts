import { z, useSafeValidatedQuery } from 'h3-zod'

import { supabaseClient } from 'server/supabase'
import { LinkType } from 'shared/types'

import { serverSupabaseUser } from '#supabase/server'

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size : size

  return { from, to }
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = supabaseClient(event)
  const query = useSafeValidatedQuery(
    event,
    z.object({
      page: z
        .number()
        .default(0)
        .transform((value) => (value === 1 ? value - 1 : value)),
      size: z.number().default(12),
    }),
  )

  if (!query.success) {
    const formattedErrors = query.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }
  const { page, size } = query.data
  const { from, to } = getPagination(page, size)
  const result: { data: LinkType[]; count: number; page: number } = {
    data: [],
    count: 0,
    page: page + 1,
  }

  const { data, error, count } = await client
    .from('links_users')
    .select('link:links(*)', { count: 'exact' })
    .eq('user_id', user?.id)
    .range(from, to)
  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
  result.count = count || 0
  for await (const item of data) {
    const { count: clickCount, error: urlClicksError } = await client
      .from('link_click')
      .select('id')
      .eq('link_id', item.link!.id)

    if (clickCount) {
      item.link!.clicks = clickCount || 0
    }
    result.data.push(item.link)
  }

  return result
})
