<template>
  <n-button type="primary" round @click="openModal">Add link</n-button>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'

import CreateLinkModal from './modal.vue'

const emits = defineEmits(['success'])
const { open: openModal } = useModal({
  component: CreateLinkModal,
  bind: {
    onSuccess: () => {
      emits('success')
    },
  },
})
</script>
