<template>
  <div class="card max-w-sm w-full bg-base-100 shadow-xl overflow-hidden">
    <div class="card-body gap-4">
      <h2 class="card-title flex justify-between">
        {{ url.title }}
      </h2>
      <div class="flex justify-between items-center">
        <p class="text-lg max-w-[80%] truncate">
          <a :href="url.redirect_url" class="link" target="_blank">{{ url.redirect_url }}</a>
        </p>
        <button class="btn btn-square btn-ghost">
          <Icon size="20px" name="material-symbols:content-copy-outline" />
        </button>
      </div>
      <div class="flex justify-between items-center">
        <p class="max-w-[80%] truncate">{{ url.original_url }}</p>
        <button class="btn btn-square btn-ghost">
          <Icon size="20px" name="material-symbols:content-copy-outline" />
        </button>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary">{{ t('remove') }}</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UrlType } from 'shared/types'

interface Props {
  url: UrlType
}
const { t } = useI18n()

const props = defineProps<Props>()
</script>
