<template>
  <div class="text-center">
    <entity-statistic-total :statistic="statisticData" :loading="pendingStatisticData" class="mb-10" />
    <div class="mb-10">
      <div v-if="linksData?.data" class="flex items-center gap-6">
        <h2 class="text-2xl font-bold text-left">Links</h2>
        <feature-create-link-trigger @success="refreshData" />
      </div>
    </div>
    <entity-links-list :links="linksData?.data || null" :loading="pendingLinksData" />
    <div class="mt-16">
      <feature-create-link-trigger v-if="!linksData?.data" @success="refreshData" />
    </div>
    <shared-ui-pagination v-if="!pendingLinksData && linksData.count > 10" class="mx-auto" :total="linksData?.count" />
  </div>
</template>
<script lang="ts" setup>
import { EntityLinksList } from 'entities/link'
import { EntityStatisticTotal } from 'entities/statistic'
import { FeatureCreateLinkTrigger } from 'features/create-link'

const router = useRouter()
const route = useRoute()

const page = computed({
  get() {
    return parseInt(route.query.page) || 1
  },
  set(value) {
    router.push({ query: { ...route.query, page: value } })
  },
})

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const {
  data: linksData,
  pending: pendingLinksData,
  refresh: refreshLinksData,
} = useLazyAsyncData(
  async () => {
    try {
      const data = await $fetch(`/api/links?page=${page.value}`, { headers })
      return data
    } catch (error: any) {
      if (isNuxtError(error) && error.statusCode === 401) {
        return navigateTo('/')
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
} = useLazyFetch('/api/links/statistic', { headers })

const refreshData = () => {
  page.value = 1
  refreshLinksData()
  refreshStatisticData()
}

provide('refreshData', refreshData)
</script>
