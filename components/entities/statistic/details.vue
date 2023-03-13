<template>
  <div class="flex mb-5 mt-10 sm:max-w-[150px]">
    <n-select v-model:value="dateRangeValue" :options="dateRangeOptions" size="large" />
  </div>
  <div v-if="statistic">
    <div class="bg-white rounded-2xl p-5 mb-5">
      <client-only>
        <entities-statistic-bar-chart v-if="statistic" class="h-[300px] md:h-[500px]" :options="statistic" />
      </client-only>
    </div>
    <div class="flex flex-col md:flex-row gap-5">
      <div class="bg-white rounded-2xl p-5 basis-1/2">
        <n-tabs v-model:value="devicesTab" type="segment" class="mb-2">
          <n-tab v-for="(item, idx) in ['Devices', 'OS', 'Browser', 'Bot']" :key="idx" :name="item" :tab="item"></n-tab>
        </n-tabs>
        <client-only>
          <entities-statistic-pie-chart
            v-if="devicesValueItem"
            class="h-[300px] md:h-[500px]"
            :options="devicesValueItem"
            :title="devicesTab"
          />
          <div v-else class="flex items-center justify-center h-[300px] md:h-[500px]">
            <n-empty size="huge" description="No data"></n-empty>
          </div>
        </client-only>
      </div>
      <div class="bg-white rounded-2xl p-5 basis-1/2">
        <n-tabs v-model:value="locationTab" type="segment" class="mb-2">
          <n-tab v-for="(item, idx) in ['City', 'Country']" :key="idx" :name="item" :tab="item"></n-tab>
        </n-tabs>
        <entities-statistic-pie-chart
          v-if="locationValue"
          class="h-[300px] md:h-[500px]"
          :options="locationValue"
          :title="locationTab"
        />
        <div v-else class="flex items-center justify-center h-[300px] md:h-[500px]">
          <n-empty size="huge" description="No data"></n-empty>
        </div>
      </div>
    </div>
  </div>
  <div v-else><n-empty size="huge" description="No data"></n-empty></div>
</template>
<script setup lang="ts">
import { NSelect, NEmpty, NTab, NTabs } from 'naive-ui'
import { THEME_KEY } from 'vue-echarts'

import { StatisticType } from 'types'

provide(THEME_KEY, 'light')

interface Props {
  statistic?: Map<number | string, StatisticType[]> | null
  devices?: Record<string, number> | null
  os?: Record<string, number> | null
  browser?: Record<string, number> | null
  country?: Record<string, number> | null
  city?: Record<string, number> | null
  bot?: Record<string, number> | null
}

const props = withDefaults(defineProps<Props>(), {
  statistic: null,
  devices: null,
  os: null,
  browser: null,
  country: null,
  city: null,
  bot: null,
})
const { statistic } = toRefs(props)
const route = useRoute()
const router = useRouter()
const devicesTab = ref<'Devices' | 'OS' | 'Browser' | 'Bot'>('Devices')
const devicesValueItem = computed(() => {
  const value = props[devicesTab.value.toLowerCase()]
  return Object.keys(value).length && value
})
const locationTab = ref<'Country' | 'City'>('Country')
const locationValue = computed(() => {
  const value = props[locationTab.value.toLowerCase()]
  return Object.keys(value).length && value
})
const dateRangeOptions = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Week',
    value: 'week',
  },
  {
    label: 'Month',
    value: 'month',
  },
  {
    label: 'Year',
    value: 'year',
  },
]

const dateRangeValue = computed({
  get() {
    return (route.query.dateRange as string) || 'Month'
  },
  set(value: string) {
    router.push({ name: 'dashboard-id', query: { ...route.query, dateRange: value } })
  },
})
</script>
