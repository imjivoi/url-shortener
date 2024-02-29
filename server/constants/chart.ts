import {
  getDate,
  getDay,
  getDaysInMonth,
  getHours,
  getMonth,
  getWeek,
  getYear,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  format,
  startOfDay,
  eachHourOfInterval,
  startOfHour,
} from 'date-fns'

import { utcToZonedTime } from 'date-fns-tz'

import type { StatisticType } from '@/types'

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const dateRangeConfig: Record<
  string,
  {
    items: Map<string, StatisticType[]>
    checkFunction: (value: string) => string
    from: string
  }
> = {
  '24h': {
    items: new Map(
      eachHourOfInterval({ start: new Date(Date.now() - 82800000), end: new Date() }).map((value) => [
        value.toISOString(),
        [],
      ]),
    ),
    checkFunction: (value: string) => {
      return startOfHour(new Date(value)).toISOString()
    },
    from: new Date(Date.now() - 82800000).toISOString(),
  },
  week: {
    items: new Map(week.map((value) => [value, []])),
    checkFunction: (value: string) => format(new Date(value), 'EEEE'),
    from: startOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
  },
  month: {
    items: new Map(
      Array.from({ length: getDaysInMonth(new Date()) }, (_, i) => i + 1).map((value) => [
        `${months[getMonth(new Date())].substring(0, 3)} ${value}`,
        [],
      ]),
    ),
    checkFunction: (value: string) => `${months[getMonth(new Date())].substring(0, 3)} ${getDate(new Date(value))}`,
    from: startOfMonth(Date.now()).toISOString(),
  },
  year: {
    items: new Map(months.map((value) => [value, []])),
    checkFunction: (value: string) => months[getMonth(new Date(value))],
    from: startOfYear(Date.now()).toISOString(),
  },
}
