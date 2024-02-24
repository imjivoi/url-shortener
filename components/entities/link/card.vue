<template>
  <div class="w-full shadow-sm overflow-hidden rounded-xl relative bg-gray-200 dark:bg-gray-800">
    <div class="py-2 px-4 sm:py-5 flex flex-col sm:flex-row sm:gap-1 justify-between sm:items-center">
      <div class="basis-1/2 overflow-hidden">
        <div class="flex gap-4">
          <h2 class="text-lg font-bold text-left truncate">
            {{ link.title }}
          </h2>
          <div class="flex items-center gap-1 sm:hidden text-gray-500">
            <u-button variant="soft" :to="'/dashboard/' + link.id">
              {{
                Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(link?.clicks || 0)
              }}
              <Icon size="15px" name="ion:stats-chart-outline" />
            </u-button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-5 text-left">
          <p class="text-sm max-w-[100%] font-semibold truncate text-primary-600 basis-1/2">
            <a :href="link.redirect_url" target="_blank">{{ link.redirect_url }}</a>
          </p>
          <p class="max-w-[100%] text-sm truncate basis-1/2">
            <a :href="link.original_url" target="_blank">
              {{ link.original_url }}
            </a>
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        <div class="hidden sm:flex items-center gap-1 text-gray-500">
          <u-button variant="soft" :to="'/dashboard/' + link.id">
            {{
              Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(link?.clicks || 0)
            }}
            <Icon size="15px" name="ion:stats-chart-outline" />
          </u-button>
        </div>
        <div class="flex justify-between items-center sm:justify-start flex-row gap-6 text-gray-500 mt-5 sm:mt-0">
          <!-- <u-button variant="ghost" >Stats</u-button> -->
          <div class="flex flex-row gap-4">
            <u-button icon="material-symbols:content-copy-outline" variant="link" @click="$emit('copy')"></u-button>
            <!-- <n-button class="!hover:text-red-500" circle text type="error" @click="$emit('delete')">
              <template #icon>
                <Icon size="15px" name="material-symbols:delete-outline" />
              </template>
            </n-button> -->
            <u-dropdown :items="options">
              <u-button variant="link" icon="mdi:dots-vertical"></u-button>
            </u-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  link: any
}

defineProps<Props>()

const emits = defineEmits(['copy', 'delete', 'edit'])

const { t } = useI18n()

const options = [
  [
    {
      label: t('edit'),
      click: () => emits('edit'),
      icon: 'ph:pencil-light',
    },
    {
      label: t('delete'),
      click: () => emits('delete'),
      icon: 'heroicons:trash-20-solid',
    },
  ],
]
</script>
