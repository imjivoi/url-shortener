<template>
  <v-chart :option="option" autoresize />
</template>

<script setup lang="ts">
/**
 * TODO: доделать тултип
 */
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, TimelineComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

import { StatisticType } from 'types'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, TimelineComponent])

interface Props {
  options: Map<string | number, StatisticType[]>
}
const props = defineProps<Props>()

const { options } = toRefs(props)

const option = computed(() => ({
  title: {
    text: 'Clicks',
    left: 'center',
  },
  tooltip: {
    show: false,
    trigger: 'item',
    // formatter: function (params, ticket, callback) {
    //   const details = options.value.get(parseInt(params.name))
    //   const result = `
    //     Clicks: ${params.value}
    //     Devices:
    //       ${}
    //   `

    //   return result
    // },
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
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
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

<style scoped>
</style>
