<template>
  <div class="text-center">
    <entities-statistic-total :statistic="statisticData" :loading="pendingStatisticData" class="mb-10" />
    <div class="mb-10">
      <div v-if="linksData?.data" class="flex items-center gap-6">
        <h2 class="text-2xl font-bold text-left">Links</h2>
        <features-create-link-trigger @success="refreshData" />
      </div>
    </div>
    <entities-link-cards-list :links="linksData?.data || null" :loading="pendingLinksData" />
    <div class="mt-16">
      <features-create-link-trigger v-if="!linksData?.data" @success="refreshData" />
    </div>
    <shared-pagination v-if="!pendingLinksData && linksData?.count > 10" class="mx-auto" :total="linksData?.count" />
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()
const route = useRoute('dashboard')

const page = computed({
  get() {
    return parseInt(route.query.page) || 1
  },
  set(value) {
    router.push({ query: { ...route.query, page: value } })
  },
})

const {
  data: linksData,
  pending: pendingLinksData,
  refresh: refreshLinksData,
} = useLazyAsyncData(
  'links',
  async () => {
    try {
      const data = await $fetch(`/api/links?page=${page.value}`, {
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
      })
      return data
    } catch (error: any) {
      if (isNuxtError(error) && error.statusCode === 401) {
        return router.push('/')
      }
    }
  },
  {
    watch: [page],
  },
)
const {
  data: statisticData,
  pending: pendingStatisticData,
  refresh: refreshStatisticData,
} = useLazyAsyncData('statistic', async () => {
  try {
    const data = await $fetch('/api/links/statistic', {
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    return data
  } catch (error: any) {
    if (isNuxtError(error) && error.statusCode === 401) {
      return router.push('/')
    }
  }
})

const refreshData = () => {
  page.value = 1
  refreshLinksData()
  refreshStatisticData()
}

provide('refreshData', refreshData)
</script>
