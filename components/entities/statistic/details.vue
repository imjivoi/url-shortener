<template>
  <div>
    <it-toggle v-model="dateRangeValue" round :options="['Today', 'Week', 'Month', 'Year']" class="mb-2" />
  </div>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="bg-white rounded-2xl p-5 basis-1/2">
      <it-toggle v-model="detailsValue" round :options="['Devices', 'OS', 'Browser', 'Country']" class="mb-2" />
      <entities-statistic-pie-chart
        v-if="detailsValueItem"
        class="h-[300px] md:h-[500px]"
        :options="detailsValueItem"
        :title="detailsValue"
      />
    </div>
    <div class="bg-white rounded-2xl p-5 basis-1/2">
      <entities-statistic-bar-chart v-if="statistic" class="h-[300px] md:h-[500px]" :options="statistic" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { THEME_KEY } from 'vue-echarts'

import { StatisticType } from 'types'

provide(THEME_KEY, 'light')

interface Props {
  statistic?: Map<number | string, StatisticType[]> | null
  devices?: Record<string, number> | null
  os?: Record<string, number> | null
  browser?: Record<string, number> | null
  country?: Record<string, number> | null
}

const props = withDefaults(defineProps<Props>(), {
  statistic: null,
  devices: null,
  os: null,
  browser: null,
  country: null,
})
const { statistic } = toRefs(props)
const route = useRoute()
const router = useRouter()
const detailsValue = ref<'Devices' | 'OS' | 'Browser' | 'Country'>('Devices')
const detailsValueItem = computed(() => props[detailsValue.value.toLowerCase()])

const dateRangeValue = computed({
  get() {
    return (route.query.dateRange as string) || 'Today'
  },
  set(value: string) {
    router.push({ name: 'dashboard-id', query: { ...route.query, dateRange: value } })
  },
})
</script>
