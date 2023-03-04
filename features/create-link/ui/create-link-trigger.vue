<template>
  <button class="btn btn-primary shadow-sm shadow-primary" @click="openModal">Add your first link</button>
</template>
<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import CreateLinkModal from './create-link-modal.vue'

const emits = defineEmits(['success'])
const { open: openModal } = useModal({
  component: CreateLinkModal,
  attrs: {
    onSuccess: () => {
      emits('success')
    },
  },
})
</script>
