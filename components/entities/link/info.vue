<template>
  <div>
    <div>
      <h2 class="font-bold text-2xl">{{ link?.title }}</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LinkType } from 'types'

interface Props {
  link: LinkType
}

defineProps<Props>()
</script>
