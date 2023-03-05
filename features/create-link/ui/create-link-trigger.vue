<template>
  <button class="btn btn-primary shadow-sm shadow-primary" @click="openModal">Add link</button>
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
