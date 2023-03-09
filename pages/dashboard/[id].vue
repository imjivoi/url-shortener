<template>
  <div class="mb-5 flex items-center w-full">
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
    <!-- <entity-link-info :link="linkData" /> -->
    in progress
  </div>
</template>
<script lang="ts" setup>
import { EntityLinkInfo } from 'entities/link'
const route = useRoute('dashboard-id')

const { pending: pendingLinkData, data: linkData } = useLazyAsyncData(async () => {
  try {
    const data = await $fetch(`/api/links/${route.params.id}`, {
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    return data
  } catch (error) {}
})

const { pending: pendingStatistic, data: statistic } = useLazyAsyncData(async () => {
  try {
    const data = await $fetch(`/api/links/statistic/${route.params.id}`, {
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    return data
  } catch (error) {}
})
</script>
