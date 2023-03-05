<template>
  <modal-default @update:model-value="close">
    <template #title>
      {{ title }}
    </template>
    <p v-if="content" class="text-center text-xl">{{ content }}</p>
    <template #footer>
      <div class="flex justify-center">
        <div class="flex gap-4">
          <button class="btn btn-primary" @click="confirm()">
            {{ confirmActionButton }}
          </button>
          <button class="btn btn-ghost" @click="close">
            {{ cancelActionButton }}
          </button>
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
  confirmActionButton?: string
  cancelActionButton?: string
  title: string
  content?: string
}
const emits = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<Props>(), {
  confirmActionButton: 'Confirm',
  cancelActionButton: 'Cancel',
  content: '',
})

const close = () => {
  emits('update:modelValue', false)
}
const confirm = () => {
  props.confirmAction()
  close()
}
</script>

<style></style>
