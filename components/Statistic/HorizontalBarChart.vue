<template>
  <v-chart :option="option" autoresize :theme="{}" :style="{ height: `${height}px` }" />
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
        color: colorMode.value === 'dark' ? '#fff' : '#000', //var(--primary-text-color)
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
        color: colorMode.value === 'dark' ? '#fff' : '#000', //var(--primary-text-color)
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
        borderRadius: 8,
        color: (params) => {
          const idx = Object.keys(options.value).indexOf(params.name)
          return getColor(idx)
        },
      },
      emphasis: {
        disabled: true,
      },
    },
  ],
}))

function getChartHeight() {
  return Object.keys(props.options).length * 20 + 200
}

function getColor(idx: number) {
  const light = [
    'rgba(255, 190, 11, 0.2)',
    'rgba(251, 86, 7, 0.2)',
    'rgba(255, 0, 110, 0.2)',
    'rgba(131, 56, 236, 0.2)',
    'rgba(58, 134, 255, 0.2)',
    'rgba(6, 214, 160, 0.2)',
    'rgba(7, 59, 76, 0.2)',
    'rgba(240, 128, 128, 0.2)',
    'rgba(255, 218, 185, 0.2)',
    'rgba(7, 59, 76, 0.2)',
    'rgba(255, 153, 200, 0.2)',
    'rgba(252, 246, 189, 0.2)',
    'rgba(208, 244, 222, 0.2)',
  ]

  const dark = [
    'rgba(255, 190, 11, 0.5)',
    'rgba(251, 86, 7, 0.5)',
    'rgba(255, 0, 110, 0.5)',
    'rgba(131, 56, 236, 0.5)',
    'rgba(58, 134, 255, 0.5)',
    'rgba(6, 214, 160, 0.5)',
    'rgba(7, 59, 76, 0.5)',
    'rgba(240, 128, 128, 0.5)',
    'rgba(255, 218, 185, 0.5)',
    'rgba(7, 59, 76, 0.5)',
    'rgba(255, 153, 200, 0.5)',
    'rgba(252, 246, 189, 0.5)',
    'rgba(208, 244, 222, 0.5)',
  ]

  const colors = colorMode.value === 'dark' ? dark : light
  return colors[idx] || colors[0]
}
</script>
