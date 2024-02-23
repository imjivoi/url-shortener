import * as v from 'valibot'

import { getLinksByUserId } from '../../../services'

const getPagination = (page: number, size: number) => {
  page = page - 1
  const limit = size || 10
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
}

export default defineAuthEventHandler(async (event, user) => {

  const { page, size } = await useValidatedQuery(
    event,
    v.objectAsync({
      page: v.optional(v.coerce(v.number(), Number), 1),
      size: v.optional(v.coerce(v.number(), Number), 10),
    }),
  )

  const { from, to } = getPagination(page, size)

  const result: { data: any[]; count: number; page: number } = {
    data: [],
    count: 0,
    page: page + 1,
  }

  const { data, error, count } = await getLinksByUserId(user.id, { from, to })

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
