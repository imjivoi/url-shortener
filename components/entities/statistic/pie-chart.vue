<template>
  <!-- <v-chart :option="option" autoresize :theme="colorMode" /> -->
  <VueUiVerticalBar :config="config" :dataset="dataset" class="!pt-4"/>
</template>

<script setup lang="ts">
import { VueUiVerticalBar, type VueUiVerticalBarConfig, type VueUiVerticalBarDatasetItem } from 'vue-data-ui'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([SVGRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

interface Props {
  options: Record<string, number>
  title?: string
}

const colorMode = useColorMode()

const props = defineProps<Props>()
const { options, title } = toRefs(props)
const option = computed(() => ({
  darkMode: colorMode.value === 'dark',
  // title: {
  //   text: title?.value && capitalize(title.value),
  //   left: 'center',
  // },
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

const dataset: VueUiVerticalBarDatasetItem[] = computed(() =>
  Object.entries(options.value).map(([name, value]) => ({
    name,
    value,
  })),
)

// const dataset = [
//   {
//     name: '1',
//     value: 50
//   },
//   {
//     name: '2',
//     value: 40
//   }
// ]
const config: VueUiVerticalBarConfig = {
  useCssAnimation: true,
  style: {
    fontFamily: 'inherit',
    chart: {
      legend: {
        show: false,
      },
      backgroundColor: 'transparent',
      color: '#1A1A1A',
      layout: {
        useDiv: true,
        bars: {
          sort: 'desc',
          useStroke: false,
          strokeWidth: 2,
          height: 48,
          gap: 10,
          borderRadius: 4,
          offsetX: 0,
          paddingRight: 4,
          useGradient: true,
          gradientIntensity: 40,
          fillOpacity: 10,
          underlayerColor: '#FFFFFF',
          dataLabels: {
            color: '#1A1A1A',
            bold: true,
            fontSize: 16,
            value: { show: true, roundingValue: 0, prefix: '', suffix: '' },
            percentage: { show: false, roundingPercentage: 0 },
            offsetX: 10,
          },
          nameLabels: { show: true, color: '#1A1A1A', bold: true, fontSize: 24, offsetX: -30 },
          parentLabels: { show: false, color: '#1A1A1A', bold: false, fontSize: 10, offsetX: 0 },
        },
        highlighter: { color: '#1A1A1A', opacity: 1 },
        separators: { show: false, color: '#CCCCCC', strokeWidth: 1 },
      },
      // title: {
      //   text: 'Title',
      //   color: '#1A1A1A',
      //   fontSize: 20,
      //   bold: true,
      //   subtitle: { color: '#565656', text: 'Subtitle', fontSize: 16, bold: false },
      // },
      // legend: {
      //   position: 'top',
      //   show: true,
      //   fontSize: 14,
      //   color: '#1A1A1A',
      //   bold: true,
      //   roundingValue: 0,
      //   backgroundColor: '#F3F4F6',
      //   roundingPercentage: 0,
      //   prefix: '',
      //   suffix: '',
      // },
      tooltip: {
        show: false,
        backgroundColor: '#F3F4F6',
        color: '#1A1A1A',
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: '',
        suffix: '',
      },
    },
  },
  userOptions: {
    show: false,
    title: 'options',
    labels: { useDiv: 'Title & legend inside', showTable: 'Show table', sort: 'Sort desc' },
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: { backgroundColor: '#F3F4F6', color: '#1A1A1A', outline: 'none' },
    td: {
      backgroundColor: '#F3F4F6',
      color: '#1A1A1A',
      outline: 'none',
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: '',
      suffix: '',
    },
  },
  translations: {
    parentName: 'Serie',
    childName: 'Child',
    value: 'value',
    percentageToTotal: '%/total',
    percentageToSerie: '%/serie',
  },
}
</script>

<style scoped></style>
