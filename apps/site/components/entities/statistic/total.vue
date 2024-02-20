<template>
  <div>
    <!-- <h2 class="mb-2 text-2xl font-bold">Statistic</h2> -->
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-sm md:px-24 lg:px-8 lg:py-12">
      <div v-if="loading" class="grid grid-cols-2 row-gap-8">
        <div class="text-center md:border-r">
          <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
            <div class="flex flex-col items-center w-full space-x-2">
              <div class="h-[48px] bg-gray-300 rounded-full w-[48px] mb-5"></div>
              <div class="h-[12px] bg-gray-300 rounded-full w-24"></div>
            </div>
          </div>
        </div>
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div class="flex flex-col items-center w-full space-x-2">
            <div class="h-[48px] bg-gray-300 rounded-full w-[48px] mb-5"></div>
            <div class="h-[12px] bg-gray-300 rounded-full w-24"></div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 row-gap-8">
        <div class="text-center md:border-r">
          <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">{{ statistic?.links }}</h6>
          <p class="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">{{ $t('links') }}</p>
        </div>
        <div class="text-center">
          <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">{{ statistic?.clicks }}</h6>
          <p class="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">{{ $t('clicks') }}</p>
        </div>
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
