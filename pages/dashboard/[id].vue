<template>
  <div class="mb-16 flex items-center w-full">
    <nuxt-link
      class="text-lg flex gap-1 items-center transition-all duration-300 hover:text-primary-500 hover:underline"
      to="/dashboard"
    >
      <Icon name="ic:baseline-arrow-back" />
      <span class="first-letter:uppercase">{{ $t('all_links') }}</span>
    </nuxt-link>
    <h1 class="text-3xl font-bold text-center mx-auto first-letter:uppercase">{{ $t('statistic') }}</h1>
  </div>
  <div>
    <!-- <entities-link-info-skeleton v-if="pendingLinkData" />
    <entities-link-info v-else class="mb-5" :link="linkData" />
    <entities-statistic-details-skeleton v-if="pendingStatistic" /> -->
    <entities-statistic-details
      :statistic="statistic?.items"
      :devices="statistic?.device"
      :os="statistic?.os"
      :browser="statistic?.browser"
      :country="statistic?.country"
      :city="statistic?.city"
      :bot="statistic?.bot"
    />
  </div>
</template>
<script lang="ts" setup>

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Statistic`,
})

const route = useRoute('dashboard-id')

const { pending: pendingLinkData, data: linkData } = useLazyAsyncData('link-id', async () => {
  try {
    const data = await $fetch(`/api/links/${route.params.id}`, {
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    return data
  } catch (error) {}
})

const { pending: pendingStatistic, data: statistic } = useLazyAsyncData(
  'link-id-statistic',
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
</script>
