<template>
  <div class="card w-full bg-base-100 shadow-sm overflow-hidden">
    <div class="card-body py-2 sm:py-5 flex-row gap-4 justify-between items-center">
      <div>
        <div>
          <h2 class="card-title flex justify-between">
            {{ link.title }}
          </h2>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
            <p class="text-sm max-w-[80%] font-semibold truncate text-primary">
              <a :href="link.redirect_url" target="_blank">{{ link.redirect_url }}</a>
            </p>
            <p class="max-w-[80%] text-sm truncate">{{ link.original_url }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
        <div>
          {{ link.clicks }}
          <Icon size="15px" name="ion:stats-chart-outline" />
        </div>
        <div class="flex flex-col sm:flex-row">
          <button class="btn btn-sm btn-ghost hover:text-primary">
            <Icon size="15px" name="material-symbols:content-copy-outline" @click="$emit('copy')" />
          </button>
          <button class="btn btn-sm btn-ghost hover:text-error">
            <Icon size="15px" name="material-symbols:delete-outline" />
          </button>
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
const { t } = useI18n()

defineProps<Props>()
const emits = defineEmits(['copy', 'delete'])
</script>
