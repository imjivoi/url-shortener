<template>
  <v-chart
    :option="option"
    autoresize
    :theme="{
      textStyle: {
        color: colorMode.value === 'dark' ? '#fff' : '#000',
      },
    }"
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

// const option = computed(() => ({
//   title: {
//     text: '',
//     left: 'left',
//   },
//   tooltip: {
//     show: true,
//     trigger: 'item',
//   },
//   xAxis: {
//     offset: 50,
//     type: 'value',
//     show: false,
//   },
//   yAxis: [
//     {
//       type: 'category',
//       data: Object.keys(options.value),
//       show: true,
//       position: 'left',
//       axisLine: {
//         show: false,
//       },
//       z: 3,
//       axisTick: {
//         show: false,
//       },
//       axisLabel: {
//         color: '#000', //var(--primary-text-color)
//         inside: true,
//         // ...
//         show: true,
//       },
//       nameLocation: 'start',
//     },
//     {
//       type: 'category',
//       data: Object.values(options.value),
//       position: 'right',
//       axisLine: {
//         show: false,
//       },
//       axisTick: {
//         show: false,
//       },
//       axisLabel: {
//         color: '#000', //var(--primary-text-color)
//         inside: false,
//         show: true,
//       },
//     },
//   ],
//   series: Object.entries(options.value).map(([key, value]) => ({
//     type: 'bar',
//     data: [value],
//     name: key,
//     label: {
//       show: true,
//     },
//   })),
//   //  [
//   //   {
//   //     type: 'bar',
//   //     data: Array.from(options.value).map(([_, value]) => (value?.length ? value.length : 0)),
//   //   },
//   // ],
//   // dataset: {
//   //   source: [Object.entries(options.value).map(([key, value]) => [key, value])],
//   // },
//   // visualMap: {
//   //   orient: 'horizontal',
//   //   left: 'center',
//   //   min: 10,
//   //   max: 100,
//   //   text: ['High Score', 'Low Score'],
//   //   // Map the score column to color
//   //   dimension: 0,
//   //   inRange: {
//   //     color: ['#65B581', '#FFCE34', '#FD665F'],
//   //   },
//   // },
// }))
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
  grid: { containLabel: true },
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
        // color: '#000', //var(--primary-text-color)
        inside: false,
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
      barMaxWidth: 40,
      barGap: 40,
      barCategoryGap: 15,
      itemStyle: {
        borderRadius: 4,
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
</script>
