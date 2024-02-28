<template>
  <div>
    <!-- <h2 class="mb-2 text-2xl font-bold">Statistic</h2> -->
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-sm md:px-24 lg:px-8 lg:py-12">
      <div v-if="loading" class="grid sm:grid-cols-2 gap-4 sm:gap-8">
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div class="w-full h-20 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div class="w-full h-20 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>
      <div v-else class="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="grid gap-2 text-center bg-gray-200 dark:bg-gray-800 rounded-xl p-2">
          <span class="font-medium text-gray-400">Total links</span>
          <span class="text-2xl font-medium tracking-widest truncate">{{ statistic?.links }}</span>
        </div>
        <div class="grid gap-2 text-center bg-gray-200 dark:bg-gray-800 rounded-xl p-2">
          <span class="font-medium text-gray-400">Total clicks</span>
          <span class="text-2xl font-medium truncate">{{ statistic?.clicks }}</span>
        </div>
        <!-- <div class="grid gap-2 text-center bg-gray-200 dark:bg-gray-800 rounded-xl p-2">
          <span class="font-medium text-gray-400">Most popular</span>
          <span class="text-sm font-medium truncate text-left">Clicks: {{ statistic?.mostPopular.clicks }}</span>
          <span class="text-sm font-medium truncate text-left">URL: {{ statistic?.mostPopular.url }}</span>
        </div> -->
      </div>
    </div>
    <!-- <div class="stats stats-horizontal shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <Icon name="tabler:link" />
        </div>
        <div class="stat-title">Links</div>
        <div class="stat-value text-primary">
          {{ statistic?.links }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon name="tabler:hand-click" />
        </div>
        <div class="stat-title">Clicks</div>
        <div class="stat-value text-secondary">
          {{ statistic?.clicks }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
// import type{ TotalLinkStatisticType } from '../../../types'

interface Props {
  statistic: any | null
  loading: boolean
}

defineProps<Props>()
</script>
