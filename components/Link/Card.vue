<template>
  <div class="p-4 grid gap-4 transition-all shadow hover:shadow-md rounded-xl bg-white dark:bg-gray-800">
    <div class="flex justify-between gap-6">
      <div class="flex gap-4">
        <div class="flex-none">
          <nuxt-img :src="getFaviconUrl()" width="40" class="rounded-full" />
        </div>
        <div class="overflow-hidden grid gap-1 text-left">
          <h2 class="text-lg font-bold text-left truncate" v-if="link.title">
            <a class="hover:text-primary-600" :href="link.original_url">{{ link.title }}</a>
          </h2>
          <a :href="link.original_url" v-else>{{ link.title }}</a>
          <p class="text-sm font-semibold truncate text-primary-600">
            <a :href="link.redirect_url" target="_blank">{{ link.redirect_url }}</a>
          </p>
        </div>
      </div>

      <div>
        <u-dropdown :items="options">
          <u-button variant="link" icon="mdi:dots-vertical"></u-button>
        </u-dropdown>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="text-gray-500 text-sm">{{link.created_at !== link.updated_at ? 'edited ' : ''}}{{ getDate(link.updated_at) }}</div>
      <div class="flex gap-2">
        <u-button variant="soft" :to="'/dashboard/' + link.id">
          {{
            Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(link?.clicks || 0)
          }}
          <Icon size="15px" name="ion:stats-chart-outline" />
        </u-button>
        <u-button icon="material-symbols:content-copy-outline" variant="link" @click="$emit('copy')"></u-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { formatDistanceToNow } from 'date-fns'

interface Props {
  link: any
}

const props = defineProps<Props>()

const emits = defineEmits(['copy', 'delete', 'edit'])

// const { t } = useI18n()

const options = [
  [
    {
      label: 'Edit',
      click: () => emits('edit'),
      icon: 'ph:pencil-light',
    },
    {
      label: 'Delete',
      click: () => emits('delete'),
      icon: 'heroicons:trash-20-solid',
    },
  ],
]

function getFaviconUrl() {
  const url = new URL(props.link.original_url)

  return `https://www.google.com/s2/favicons?sz=64&domain_url=${url.hostname}`
}

function getDate(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
</script>
