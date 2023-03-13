<template>
  <v-chart :option="option" autoresize />
</template>

<script setup lang="ts">
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

interface Props {
  options: Record<string, number>
  title?: string
}

const props = defineProps<Props>()
const { options, title } = toRefs(props)
const option = computed(() => ({
  title: {
    text: title?.value && capitalize(title.value),
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: Object.keys(options.value),
  },
  series: [
    {
      name: title?.value && capitalize(title.value),
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: Object.entries(options.value).map(([name, value]) => ({ name, value })),
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

<style scoped></style>
