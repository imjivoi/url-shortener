import * as v from 'valibot'

import { getByLinkId } from '../../../../../services'

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))
  const { dateRange } = await useValidatedQuery(
    event,
    v.objectAsync({ dateRange: v.optional(v.picklist(['today', 'week', 'month', 'year']), 'today') }),
  )

  const data = await getByLinkId(
    id,
    // @ts-ignore

    {
      ...(!!dateRange && { dateRange }),
    },
  )

  return data?.length ? prepare(data, dateRange as DateRangetype) : null
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
