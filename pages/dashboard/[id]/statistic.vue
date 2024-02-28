<script setup lang="ts">
import 'vue-data-ui/style.css'

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Statistic`,
})

const { t } = useI18n()
const route = useRoute('dashboard-id-statistic')
const router = useRouter()

const { pending: pendingLinkData, data: linkData } = useLazyAsyncData(`link-${route.params.id}`, async () => {
  try {
    const data = await $fetch(`/api/links/${route.params.id}`, {
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    return data
  } catch (error) {}
})

const { pending: pendingStatistic, data: statistic } = useLazyAsyncData(
  `link-${route.params.id}-statistic`,
  async () => {
    try {
      const data = await $fetch(`/api/links/${route.params.id}/statistic`, {
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        query: {
          ...(route.query.dateRange && { dateRange: (route.query.dateRange as string).toLowerCase() }),
        },
      })
      return { ...data, items: data && new Map(data.items) }
    } catch (error) {}
  },
  {
    watch: [() => route.query.dateRange, route],
  },
)

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
    router.push({ name: 'dashboard-id-statistic', query: { ...route.query, dateRange: value } })
  },
})
</script>

<template>
  <div>
    <u-select v-model="dateRangeValue" :options="dateRangeOptions" placeholder="Select range" />

    <statistic-new-bar-chart :statistic-items="statistic?.items" :key="dateRangeValue" v-if="statistic"/>
  </div>
</template>
