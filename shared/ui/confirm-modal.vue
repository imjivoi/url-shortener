<template>
  <modal-default @update:model-value="close">
    <template #title>
      {{ title }}
    </template>
    <p class="text-center text-xl">{{ content }}</p>
    <template #footer>
      <div class="flex justify-center">
        <div class="flex gap-4">
          <shared-ui-button @click="confirm()">
            {{ confirmActionButton }}
          </shared-ui-button>
          <shared-ui-button variant="secondary" @click="close">
            {{ cancelActionButton }}
          </shared-ui-button>
        </div>
      </div>
    </template>
  </modal-default>
</template>
<script lang="ts">
export default {}
</script>
<script lang="ts" setup>
import ModalDefault from './modal.vue'

interface Props {
  confirmAction: () => void
  confirmActionButton: string
  cancelActionButton: string
  title: string
  content?: string
}
const emits = defineEmits(['update:modelValue'])

const props = defineProps<Props>()

const close = () => {
  emits('update:modelValue', false)
}
const confirm = () => {
  props.confirmAction()
  close()
}
</script>

<style></style>
