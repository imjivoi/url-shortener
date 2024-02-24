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
  format
} from 'date-fns'

import type{ StatisticType } from '@/types'

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

export const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday', 'Friday', 'Saturday']

export const dateRangeConfig: Record<
  string,
  { items: Map<number | string, StatisticType[]>; checkFunction: (value: string) => number | string; from: string }
> = {
  today: {
    items: new Map(Array.from({ length: 24 }, (_, i) => i + 1).map((value) => [`${value}:00`, []])),
    checkFunction: (value: string) => format(new Date(value), 'HH:00'),
    from: startOfToday().toISOString(),
  },
  week: {
    items: new Map(week.map((value) => [value, []])),
    checkFunction: (value: string) => week[getDay(new Date(value))],
    from: startOfWeek(Date.now()).toISOString(),
  },
  month: {
    items: new Map(Array.from({ length: getDaysInMonth(new Date()) }, (_, i) => i + 1).map((value) => [value, []])),
    checkFunction: (value: string) => getDate(new Date(value)),
    from: startOfMonth(Date.now()).toISOString(),
  },
  year: {
    items: new Map(months.map((value) => [value, []])),
    checkFunction: (value: string) => months[getMonth(new Date(value))],
    from: startOfYear(Date.now()).toISOString(),
  },
}
