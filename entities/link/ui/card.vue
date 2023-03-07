<template>
  <div class="w-full bg-gray-100 shadow-sm overflow-hidden rounded-xl">
    <div class="py-2 px-4 sm:py-5 flex flex-row gap-4 justify-between items-center">
      <div>
        <div class="text-left">
          <h2 class="text-lg font-bold">
            {{ link.title }}
          </h2>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
            <p class="text-sm max-w-[80%] font-semibold truncate text-blue-600">
              <a :href="link.redirect_url" target="_blank">{{ link.redirect_url }}</a>
            </p>
            <p class="max-w-[80%] text-sm truncate">{{ link.original_url }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
        <div>
          {{ link.clicks || 0 }}
          <Icon size="15px" name="ion:stats-chart-outline" />
        </div>
        <div class="flex flex-col sm:flex-row">
          <it-button class="hover:text-blue-600 rounded-full" variant="text" @click="$emit('copy')">
            <template #icon>
              <Icon size="15px" name="material-symbols:content-copy-outline" />
            </template>
          </it-button>
          <it-button class="hover:text-red-500 rounded-full" variant="text" @click="$emit('delete')">
            <template #icon>
              <Icon size="15px" name="material-symbols:delete-outline" />
            </template>
          </it-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LinkType } from 'shared/types'

interface Props {
  link: LinkType
}

defineProps<Props>()

const emits = defineEmits(['copy', 'delete'])
</script>
