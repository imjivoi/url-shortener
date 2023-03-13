import { z, useSafeValidatedQuery } from 'h3-zod'

import { LinkType } from 'types'

import { getLinksByUserId } from '../../model'

import { serverSupabaseUser } from '#supabase/server'

const getPagination = (page: number, size: number) => {
  const limit = size || 10
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }
  const query = useSafeValidatedQuery(
    event,
    z.object({
      page: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .default(0)
        .transform((value) => value - 1),
      size: z.number().default(10),
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

  const { data, error, count } = await getLinksByUserId(event, user.id, { from, to })

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
  result.count = count || 0

  for (const link of data) {
    // @ts-ignore
    result.data.push({ ...link, clicks: link.clicks[0].count || 0 })
  }

  return result
})
