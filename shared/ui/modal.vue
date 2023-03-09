<template>
  <vue-final-modal
    classes="modal-container pt-16  "
    content-class="modal-box w-full max-w-full sm:max-w-[600px] mx-auto bg-white py-6 px-4 sm:px-8 overflow-hidden"
    :lock-scroll="true"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    teleport-to="#__nuxt"
  >
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
</script>

<style lang="scss">
.modal {
  &-container {
    display: flex;
    justify-content: center;
    overflow-y: auto;

    @media (max-width: 640px) {
      align-items: end;
    }
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
