<template>
  <div class="flex flex-col sm:flex-row gap-5">
    <div class="rounded-2xl p-5 basis-1/2 flex flex-col gap-7 overflow-hidden relative">
      <div class="bg-card"></div>
      <h2 class="font-bold text-2xl">{{ link?.title }}</h2>
      <div class="flex flex-col gap-3">
        <div
          class="rounded-xl p-3 bg-blue-100 text-xl text-blue-500 hover:shadow hover:shadow-blue-500/50 transition-all duration-300"
        >
          <a :href="link?.redirect_url" target="_blank" class="w-full flex justify-between items-center">
            <span class="truncate">
              {{ link?.redirect_url }}
            </span>
            <Icon name="material-symbols:link-rounded" class="flex-none" />
          </a>
        </div>

        <div
          class="rounded-xl p-3 bg-yellow-100 text-yellow-500 hover:shadow hover:shadow-yellow-500/50 transition-all duration-300"
        >
          <a :href="link?.original_url" target="_blank" class="text-xl w-full flex justify-between items-center">
            <span class="truncate">
              {{ link?.original_url }}
            </span>
            <Icon name="material-symbols:link-rounded" class="flex-none" />
          </a>
        </div>
      </div>
    </div>
    <div class="rounded-2xl p-5 basis-1/2 overflow-hidden relative">
      <div class="bg-card"></div>
      <h2 class="font-bold text-2xl">Total clicks</h2>
      <div class="flex items-center justify-center h-full">
        <span class="text-6xl font-bold text-gray-500 text-center truncate">
          {{
            Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(link?.clicks || 0)
          }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LinkType } from 'types'

interface Props {
  link?: LinkType | null
}

defineProps<Props>()
</script>
