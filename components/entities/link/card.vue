<template>
  <div class="w-full bg-gray-100 shadow-sm overflow-hidden rounded-xl">
    <div class="py-2 px-4 sm:py-5 flex flex-col sm:flex-row sm:gap-1 justify-between sm:items-center">
      <div class="basis-1/2 overflow-hidden">
        <div class="flex gap-4">
          <h2 class="text-lg font-bold text-left">
            {{ link.title }}
          </h2>
          <div class="flex items-center gap-1 sm:hidden text-gray-500">
            <span>{{ link.clicks || 0 }}</span>
            <Icon size="15px" class="text-gray-500" name="ion:stats-chart-outline" />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-5 text-left">
          <p class="text-sm max-w-[100%] font-semibold truncate text-blue-600">
            <a :href="link.redirect_url" target="_blank">{{ link.redirect_url }}</a>
          </p>
          <p class="max-w-[100%] text-sm truncate">
            <a :href="link.original_url" target="_blank">
              {{ link.original_url }}
            </a>
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        <div class="hidden sm:flex items-center gap-1 text-gray-500">
          <span>
            {{
              Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(link?.clicks || 0)
            }}
          </span>
          <Icon size="15px" name="ion:stats-chart-outline" />
        </div>
        <div class="flex justify-between items-center sm:justify-start flex-row gap-6 text-gray-500 mt-5 sm:mt-0">
          <n-button size="small" ghost round type="primary" @click="$router.push('/dashboard/' + link.id)">
            Stats
          </n-button>
          <div class="flex flex-row gap-4">
            <n-button class="hover:text-blue-600" circle text @click="$emit('copy')">
              <template #icon>
                <Icon size="15px" name="material-symbols:content-copy-outline" />
              </template>
            </n-button>
            <n-button class="!hover:text-red-500" circle text type="error" @click="$emit('delete')">
              <template #icon>
                <Icon size="15px" name="material-symbols:delete-outline" />
              </template>
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'

import { LinkType } from 'types'

interface Props {
  link: LinkType
}

defineProps<Props>()

const emits = defineEmits(['copy', 'delete'])
</script>
