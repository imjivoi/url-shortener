<template>
  <vue-final-modal
    classes="modal-container pt-16  "
    content-class="modal-box w-full max-w-full sm:max-w-[600px] mx-auto bg-white dark:bg-gray-800 py-6 px-4 sm:px-8 overflow-hidden"
    :lock-scroll="true"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    teleport-to="#__nuxt"
  >
    <div class="flex justify-end sm:hidden absolute top-2 right-2 w-full">
      <u-button variant="link" icon="ic:baseline-close" @click="closeModal"></u-button>
    </div>
    <div class="modal__title text-center font-bold text-2xl">
      <slot name="title"></slot>
    </div>
    <div v-if="$slots.default" class="modal__content mt-8">
      <slot />
    </div>
    <div v-if="$slots.footer" class="modal__footer mt-8">
      <slot name="footer" />
    </div>
  </vue-final-modal>
</template>

<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

const emits = defineEmits(['update:modelValue'])
const closeModal = () => {
  emits('update:modelValue', false)
}

provide('closeModal', closeModal)
</script>

<style lang="scss">
.modal {
  &-container {
    display: flex;
    justify-content: center;
    overflow-y: auto;
  }

  &-box {
    height: fit-content;
    position: relative;
    background: white;
    border-radius: 20px;

    @media (max-width: 640px) {
      transform: none;
      max-height: none;
      border-radius: 0;
    }
  }
}
</style>
