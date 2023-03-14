<template>
  <div class="text-center">
    <h1 class="text-3xl font-bold">Dashboard</h1>
    <entities-statistic-total :statistic="statisticData" :loading="pendingStatisticData" class="mb-10" />
    <div class="mb-10">
      <div v-if="linksData?.data" class="flex justify-between items-center gap-6">
        <h2 class="text-2xl font-bold text-left">Links</h2>
        <features-create-link-trigger @success="refreshData" />
      </div>
    </div>
    <entities-link-cards-list :links="linksData?.data || null" :loading="pendingLinksData" />
    <div class="mt-16">
      <features-create-link-trigger v-if="!linksData?.data" @success="refreshData" />
    </div>
    <shared-pagination
      v-if="!pendingLinksData && linksData && linksData?.count > 10"
      class="mx-auto"
      :total="linksData?.count"
    />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  scrollToTop: true,
})
useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Dashboard`,
})
// useServerSeoMeta({
//   title: 'Simple url shortener | Dashboard',
//   ogTitle: 'Simple url shortener',
//   description: 'This is my amazing site, let me tell you all about it.',
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
// })

const router = useRouter()
const route = useRoute('dashboard')

const page = computed({
  get() {
    return parseInt(route.query.page as string) || 1
  },
  set(value) {
    router.push({ name: 'dashboard', query: { ...route.query, page: value } })
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
        router.push('/')
      }
      return null
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
      router.push('/')
    }
    return null
  }
})

const refreshData = () => {
  page.value = 1
  refreshLinksData()
  refreshStatisticData()
}

provide('refreshData', refreshData)
</script>
