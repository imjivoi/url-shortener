<template>
  <div class="text-center transition-all duration-300">
    <div>
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <statistic-total :statistic="statisticData" :loading="pendingStatisticData" class="mb-10" />
    </div>
    <div v-if="linksData?.data?.length" class="mb-10">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
        <h2 class="text-2xl font-bold text-left first-letter:uppercase">Links</h2>
        <link-create-trigger @success="refreshData" />
      </div>
    </div>
    <link-card-list
      :links="linksData?.data || null"
      :loading="pendingLinksData"
      @onRemove="refreshData"
      @on-create="refreshData"
    />
    <div v-if="!pendingLinksData && !linksData?.data?.length" class="mt-16">
      <link-create-trigger @success="refreshData" />
    </div>
    <!-- <shared-pagination
      v-if="!pendingLinksData && linksData && linksData?.count > 10"
      class="mx-auto mt-16"
      :total="linksData?.count"
    /> -->
    <div class="flex justify-center mt-10">
      <u-pagination
        v-if="!pendingLinksData && linksData && linksData?.count > 10"
        :prev-button="{ icon: 'heroicons:arrow-small-left-20-solid', label: 'Prev', color: 'gray' }"
        :next-button="{ icon: 'heroicons:arrow-small-right-20-solid', trailing: true, label: 'Next', color: 'gray' }"
        v-model="page"
        :total="linksData?.count"
      />
    </div>
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
      const data = await $fetch(`/api/links`, {
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        query: {
          page: page.value,
        },
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

function removeItem(id: string) {
  linksData.value.data = linksData.value.data.filter((link: any) => link.id !== id)
}

const refreshData = (newLink) => {
  page.value = 1
  refreshLinksData()
}
</script>
