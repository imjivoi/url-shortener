import { z, zh } from 'h3-zod'

import { getByLinkId } from 'server/model'
import { DateRangetype, StatisticType } from 'types'
import { dateRangeConfig } from 'utils'

export default defineEventHandler(async (event) => {
  const params = zh.useSafeValidatedParams(
    event,
    z.object({
      linkId: z.string().uuid(),
    }),
  )

  const query = zh.useSafeValidatedQuery(
    event,
    z.object({
      dateRange: z
        .enum(['today', 'week', 'month', 'year'])
        .transform((value) => value.toLowerCase())
        .default('month'),
    }),
  )

  if (!params.success) {
    const formattedErrors = params.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  if (!query.success) {
    const formattedErrors = query.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  const { data, error } = await getByLinkId(
    event,
    params.data.linkId,
    // @ts-ignore

    {
      ...(!!query.data.dateRange && { dateRange: query.data.dateRange }),
    },
  )

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }

  return data?.length ? prepare(data, query.data.dateRange as DateRangetype) : null
})

function prepare(data: StatisticType[], dateRange: DateRangetype) {
  const config = dateRangeConfig[dateRange]
  const items = new Map(config.items)
  const device: Record<string, number> = {}
  const os: Record<string, number> = {}
  const browser: Record<string, number> = {}
  const country: Record<string, number> = {}
  const city: Record<string, number> = {}
  const bot: Record<string, number> = {}

  for (const item of data) {
    const key = config.checkFunction(item.created_at)
    const mapValue = items.get(key)
    items.set(key, [...(mapValue || []), item])
    if (item.device) {
      device[item.device] = device[item.device] + 1 || 1
    }

    if (item.os) {
      os[item.os] = os[item.os] + 1 || 1
    }

    if (item.browser) {
      browser[item.browser] = browser[item.browser] + 1 || 1
    }

    if (item.country) {
      country[item.country] = country[item.country] + 1 || 1
    }
    if (item.city) {
      city[item.city] = city[item.city] + 1 || 1
    }

    if (item.bot) {
      bot.bot = bot.bot + 1 || 1
    }
  }
  return { items: Array.from(items), os, device, browser, country, city, bot }
}
