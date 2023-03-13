<template>
  <div class="mb-16 flex items-center w-full">
    <nuxt-link
      class="text-lg flex gap-1 items-center transition-all duration-300 hover:text-blue-500 hover:underline"
      to="/dashboard"
    >
      <Icon name="ic:baseline-arrow-back" />
      <span>All links</span>
    </nuxt-link>
    <h1 class="text-3xl font-bold text-center mx-auto">Statistic</h1>
  </div>
  <div>
    <entities-link-info class="mb-5" :link="linkData" :loading="pendingLinkData" />
    <entities-statistic-details
      :statistic="statistic?.items"
      :devices="statistic?.device"
      :os="statistic?.os"
      :browser="statistic?.browser"
      :country="statistic?.country"
    />
  </div>
</template>
<script lang="ts" setup>
import { LinkType } from 'types'

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Statistic`,
})

const route = useRoute('dashboard-id')

const { pending: pendingLinkData, data: linkData } = useLazyAsyncData('link-id', async () => {
  try {
    const data = await $fetch<LinkType>(`/api/links/${route.params.id}`, {
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    return data
  } catch (error) {}
})

const { pending: pendingStatistic, data: statistic } = useLazyAsyncData(
  'link-id-statistic',
  async () => {
    try {
      const data = await $fetch(`/api/links/statistic/${route.params.id}`, {
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        query: {
          ...(route.query.dateRange && { dateRange: (route.query.dateRange as string).toLowerCase() }),
        },
      })
      return { ...data, items: new Map(data.items) }
    } catch (error) {}
  },
  {
    watch: [() => route.query.dateRange, route],
  },
)
</script>
