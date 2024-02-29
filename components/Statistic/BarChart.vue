<template>
  <v-chart :option="option" autoresize class="chart" />
</template>

<script setup lang="ts">
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, TimelineComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { format } from 'date-fns'

import { type StatisticType } from '@/types'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, TimelineComponent])

interface Props {
  options: Map<string | number, StatisticType[]>
  dateRange: string
}
const props = defineProps<Props>()

const { options } = toRefs(props)

const formattedKeys = computed(() => {
  const keys = Array.from(options.value.keys())
  if (props.dateRange === '24h') {
    return keys.map((key) => format(new Date(key as string), 'HH:mm'))
  }
  return keys
})

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
        <b>${params.name}</b> <br>
        <b>Clicks:</b> ${params.value}
      `

      return result
    },
  },
  xAxis: {
    type: 'category',
    data: formattedKeys.value,
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
      itemStyle: {
        color: 'rgb(125 211 252)',
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          color: 'rgb(125 211 252)',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
        },
      },
    },
  ],
}))
</script>
