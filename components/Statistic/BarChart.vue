<template>
  <v-chart :option="option" autoresize class="chart" />
</template>

<script setup lang="ts">
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, TimelineComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

import { type StatisticType } from '@/types'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, TimelineComponent])

interface Props {
  options: Map<string | number, StatisticType[]>
}
const props = defineProps<Props>()

const { options } = toRefs(props)

function getDevices(items: StatisticType[]) {
  if (!items?.length) return ''
  const devices = items.reduce(
    (acc, item) => ({
      ...acc,
      [item.device]: (acc[item.device] || 0) + 1,
    }),
    {},
  )

  let stringResult = ''

  for (const [key, value] of Object.entries(devices)) {
    stringResult += `<b>${key}:</b> ${value} <br>`
  }

  return stringResult
}

function getOs(items: StatisticType[]) {
  if (!items?.length) return ''
  const os = items.reduce(
    (acc, item) => ({
      ...acc,
      [item.os]: (acc[item.os] || 0) + 1,
    }),
    {},
  )

  let stringResult = ''

  for (const [key, value] of Object.entries(os)) {
    stringResult += `<b>${key}:</b> ${value} <br>`
  }

  return stringResult
}

function getBrowser(items: StatisticType[]) {
  if (!items?.length) return ''

  const browser = items.reduce(
    (acc, item) => ({
      ...acc,
      [item.browser]: (acc[item.browser] || 0) + 1,
    }),
    {},
  )

  let stringResult = ''

  for (const [key, value] of Object.entries(browser)) {
    stringResult += `<b>${key}:</b> ${value} <br>`
  }

  return stringResult
}

function getCountry(items: StatisticType[]) {
  if (!items?.length) return ''

  const country = items.reduce(
    (acc, item) => ({
      ...acc,
      ...(item.country && { [item.country]: (acc[item.country] || 0) + 1 }),
    }),
    {},
  )

  let stringResult = ''

  for (const [key, value] of Object.entries(country)) {
    stringResult += `<b>${key}:</b> ${value} <br>`
  }

  return stringResult
}

function getCity(items: StatisticType[]) {
  if (!items?.length) return ''

  const city = items.reduce(
    (acc, item) => ({
      ...acc,
      ...(item.city && { [item.city]: (acc[item.city] || 0) + 1 }),
    }),
    {},
  )
  let stringResult = ''

  for (const [key, value] of Object.entries(city)) {
    stringResult += `<b>${key}:</b> ${value} <br>`
  }
  return stringResult
}

const option = computed(() => ({
  title: {
    text: 'Clicks',
    left: 'left',
  },
  backgroundColor: 'transparent',
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: function (params, ticket, callback) {
      const details = options.value.get(params.name)
      const result = `
        <b>Clicks:</b> ${params.value}
         <br>
        ${getDevices(details)}
        ${getOs(details)}
        ${getBrowser(details)}
        ${getCountry(details)}
        ${getCity(details)}

      `

      return result
    },
  },
  xAxis: {
    type: 'category',
    data: Array.from(options.value.keys()),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Clicks',
      type: 'bar',
      showBackground: false,
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)',
      // },
      data: Array.from(options.value).map(([_, value]) => (value?.length ? value.length : 0)),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}))
</script>
