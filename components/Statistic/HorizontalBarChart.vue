<template>
  <v-chart
    :option="option"
    autoresize
    :theme="{
      textStyle: {
        color: '#000',
      },
    }"
    :style="{ height: `${height}px` }"
  />
</template>

<script setup lang="ts">
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([SVGRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent])

interface Props {
  options: Record<string, number>
  title?: string
}

const colorMode = useColorMode()

const props = defineProps<Props>()
const { options, title } = toRefs(props)

const height = computed(() => getChartHeight())

const option = computed(() => ({
  title: {
    show: false,
  },
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    show: false,
    axisPointer: {
      type: 'none',
    },
  },
  legend: { show: false },
  grid: { containLabel: false, width: 'auto', height: 'auto' },
  xAxis: {
    type: 'value',
    show: false,
    axisLine: {
      show: false,
    },
    max: Math.max(...Object.values(options.value)),
    z: 2,
    axisTick: {
      show: false,
    },
    axisLabel: {
      formatter: '{value}',
      // color: '#000', //var(--primary-text-color)
      inside: false,
      show: true,
    },
    boundaryGap: [0, 0.5],
  },
  yAxis: [
    {
      type: 'category',
      data: Object.keys(options.value),
      show: true,
      position: 'left',
      axisLine: {
        show: false,
      },
      z: 3,
      axisTick: {
        show: false,
      },
      axisLabel: {
        // color: '#000', //var(--primary-text-color)
        inside: true,
        fontWeight: '500',
        fontSize: '16px',
        // ...
        show: true,
      },
      nameLocation: 'start',
      nameGap: 2,
    },
    {
      type: 'category',
      data: Object.values(options.value),
      position: 'right',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#000', //var(--primary-text-color)
        inside: false,
        fontSize: '14px',

        show: true,
      },
      nameGap: 2,
    },
  ],
  series: [
    {
      type: 'bar',
      data: Object.values(options.value),
      label: {
        show: false,

        formatter: '{c}',

        position: 'right',
        distance: 0,
      },
      barWidth: 40,
      barGap: 40,
      barCategoryGap: 15,
      legendHoverLink: false,
      itemStyle: {
        borderRadius: 4,
        color: 'rgb(125 211 252)',
      },
      emphasis: {
        disabled: true,
      },

      // itemStyle: {
      //   color: {
      //     type: 'linear',
      //     x: 0,
      //     y: 0,
      //     x2: 1,
      //     y2: 0,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: '#008D8E', // --histogram-item-gradient-background
      //       },
      //       {
      //         offset: 1,
      //         color: '#24C1C3', // color at 100%
      //       },
      //     ],
      //     global: false, // default is false
      //   },
      //   borderRadius: 4,

      //   // normal: {
      //   //   label: {
      //   //     show: true,
      //   //     position: ["100%", "50%"]
      //   //   }
      //   // }
      // },
    },
  ],
}))

function getChartHeight() {
  return Object.keys(props.options).length * 20 + 200
}
</script>
