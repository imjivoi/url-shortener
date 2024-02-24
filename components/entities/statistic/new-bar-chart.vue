<template>
  <ClientOnly>
    <VueUiXy :dataset="dataset" :config="config" />
  </ClientOnly>
</template>
<script setup lang="ts">
import { type VueUiXyConfig, type VueUiXyDatasetItem, VueUiXy, getVueDataUiConfig } from 'vue-data-ui'
import type { StatisticType } from '../../../types'

const props = defineProps<{
  statisticItems: Map<number | string, StatisticType[]> | null | undefined
}>()

const config = computed(() => ({
  useCssAnimation: true,
  useCanvas: true,
  chart: {
    backgroundColor: 'transparent',
    color: '#1A1A1A',
    height: 300,
    width: 500,
    highlighter: { color: '#1A1A1A', opacity: 10 },
    zoom: { show: false, color: '#42d392' },
    padding: { top: 36, right: 12, bottom: 36, left: 48 },
    grid: {
      stroke: '#C4C4C4',
      showVerticalLines: false,
      labels: {
        show: true,
        color: '#000',
        fontSize: 8,
        axis: { yLabel: 'Clicks', xLabel: 'Time', fontSize: 10 },
        xAxisLabels: {
          color: '#000',
          show: true,
          showOnlyFirstAndLast: false,
          values: props.statisticItems ? Array.from(props.statisticItems.keys()) : [],
          fontSize: 8,
          yOffset: 0,
        },
      },
    },
    labels: { fontSize: 7, prefix: '', suffix: '' },
    legend: { show: false, color: '#1A1A1A', useDiv: true, fontSize: 16 },
    title: {
      show: false,
      text: 'Title',
      color: '#1A1A1A',
      fontSize: 20,
      bold: true,
      subtitle: { fontSize: 16, color: '#565656', text: 'Subtitle' },
    },
    tooltip: {
      color: '#1A1A1A',
      backgroundColor: '#FFFFFF',
      show: true,
      showValue: true,
      showPercentage: false,
      roundingValue: 0,
      roundingPercentage: 0,
    },
    userOptions: {
      show: false,
      title: 'options',
      labels: {
        dataLabels: 'Show datalabels',
        titleInside: 'Title inside',
        legendInside: 'Legend inside',
        showTable: 'Show table',
      },
    },
  },
  bar: { borderRadius: 2, useGradient: true, labels: { show: true, offsetY: -6, rounding: 0, color: '#1A1A1A' } },
  line: {
    radius: 3,
    useGradient: true,
    strokeWidth: 2,
    labels: { show: true, offsetY: -6, rounding: 0, color: '#1A1A1A' },
    area: { useGradient: true, opacity: 30 },
  },
  plot: { radius: 3, useGradient: true, labels: { show: false, offsetY: -6, rounding: 0, color: '#1A1A1A' } },
  table: {
    rounding: 0,
    responsiveBreakpoint: 400,
    th: { backgroundColor: '#F3F4F6', color: '#1A1A1A', outline: 'none' },
    td: { backgroundColor: '#F3F4F6', color: '#1A1A1A', outline: 'none' },
    columnNames: { period: 'Period', total: 'Total' },
  },
}))

const dataset = computed<VueUiXyDatasetItem[]>(() => [
  {
    name: 'Clicks',
    series: props.statisticItems ? Array.from(props.statisticItems).map(([_, value]) => value?.length || 0) : [],
    type: 'bar',
    color: 'rgb(95,139,238)',
    dashed: false,
    dataLabels: false,
  },
])
</script>
