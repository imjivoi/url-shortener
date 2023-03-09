<template>
  <it-button variant="primary" round @click="openModal">Add link</it-button>
</template>
<script lang="ts" setup>
import CreateLinkModal from './create-link-modal.vue'

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
