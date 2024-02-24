<template>
  <div class="flex mb-5 mt-10 sm:max-w-[150px]">
    <u-select v-model="dateRangeValue" :options="dateRangeOptions" placeholder="Select range" />
  </div>
  <div v-if="statistic">
    <div class="rounded-2xl p-5 mb-5 relative">
      <client-only>
        <entities-statistic-bar-chart v-if="statistic" class="h-[300px] md:h-[500px]" :options="statistic" />
      </client-only>
    </div>
    <div class="flex flex-col md:flex-row gap-5">
      <div class="rounded-2xl p-5 basis-1/2 relative">
        <u-tabs v-model="devicesTabIdx" :items="devicesTabs" class="mb-2"></u-tabs>
        <client-only>
          <entities-statistic-horizontal-bar-chart
            v-if="devicesValueItem"
            :options="devicesValueItem"
            :title="devicesTabs[devicesTabIdx].label"
          />
          <div v-else class="flex items-center justify-center h-[300px] md:h-[500px]">Nothig found</div>
        </client-only>
      </div>
      <div class="rounded-2xl p-5 basis-1/2 relative">
        <u-tabs v-model="locationTabIdx" :items="locationTabs" class="mb-2"></u-tabs>
        <entities-statistic-horizontal-bar-chart
          v-if="locationValue"
          :options="locationValue"
          :title="locationTabs[locationTabIdx].label"
        />
        <div v-else class="flex items-center justify-center h-[300px] md:h-[500px]">Nothig found</div>
      </div>
    </div>
  </div>
  <div v-else>Nothig found</div>
</template>
<script setup lang="ts">
import { THEME_KEY } from 'vue-echarts'

import { type StatisticType } from '../../../types'


const colorMode = useColorMode()
provide(THEME_KEY, colorMode.value)

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
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const devicesTabs = [
  {
    label: 'Devices',
  },
  {
    label: 'OS',
  },
  {
    label: 'Browser',
  },
  {
    label: 'Bot',
  },
]
const devicesTabIdx = ref(0)
const devicesValueItem = computed(() => {
  // @ts-ignore
  const value = props[devicesTabs[devicesTabIdx.value].label.toLowerCase()]
  return Object.keys(value).length && value
})
const locationTabs = [
  {
    label: 'Country',
  },
  {
    label: 'City',
  },
]
const locationTabIdx = ref(0)
const locationValue = computed(() => {
  // @ts-ignore
  const value = props[locationTabs[locationTabIdx.value].label.toLowerCase()]
  return Object.keys(value).length && value
})
const dateRangeOptions = [
  {
    label: t('today'),
    value: 'today',
  },
  {
    label: t('week'),
    value: 'week',
  },
  {
    label: t('month'),
    value: 'month',
  },
  {
    label: t('year'),
    value: 'year',
  },
]

const dateRangeValue = computed({
  get() {
    return (route.query.dateRange as string) || 'today'
  },
  set(value: string) {
    router.push({ name: 'dashboard-id', query: { ...route.query, dateRange: value } })
  },
})
</script>
