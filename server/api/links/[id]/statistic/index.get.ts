import * as v from 'valibot'

import { getByLinkId } from '../../../../services'
import { dateRangeConfig, countries } from '../../../../constants'
import type { DateRangetype, StatisticType } from '../../../../../types'

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))
  const { dateRange } = await useValidatedQuery(
    event,
    v.objectAsync({ dateRange: v.optional(v.picklist(['today', 'week', 'month', 'year']), 'today') }),
  )

  const timezone = getHeader(event, 'x-vercel-ip-timezone') as string || 'America/Argentina/Tucuman'

  const from = dateRangeConfig[dateRange as DateRangetype].from(timezone)

    console.log('from: ', from)

  const data = await getByLinkId(
    id,
    // @ts-ignore

    {
      from,
    },
  )
  return data?.length ? prepare(data, dateRange as DateRangetype, timezone) : null
})

function prepare(data: StatisticType[], dateRange: DateRangetype, timezone: string) {
  const config = dateRangeConfig[dateRange]

  const items = new Map(config.items)
  const device: Record<string, number> = {}
  const os: Record<string, number> = {}
  const browser: Record<string, number> = {}
  const country: Record<string, number> = {}
  const city: Record<string, number> = {}
  const bot: Record<string, number> = {}

  for (const item of data) {
    const key = config.checkFunction(item.created_at, timezone)
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
      const countryName = countries[item.country] || item.country
      country[countryName] = country[countryName] + 1 || 1
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
