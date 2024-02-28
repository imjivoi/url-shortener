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
} from 'date-fns'

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
    items: Map<number | string, StatisticType[]>
    checkFunction: (value: string, timezone?: string) => number | string
    from: string
  }
> = {
  today: {
    items: new Map(
      Array.from({ length: 24 }, (_, i) => i + 1).map((value) => [
        value.toString().length === 2 ? `${value}:00` : `0${value}:00`,
        [],
      ]),
    ),
    checkFunction: (value: string, timeZone?: string) => {
      const date = new Date(value)
      return format(new Date(date.toLocaleString('en-US', { timeZone })), 'HH:00')
    },
    from: startOfToday().toISOString(),
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
