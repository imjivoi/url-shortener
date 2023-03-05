<template>
  <vue-final-modal
    classes="modal-container"
    content-class="modal-box w-full max-w-full sm:max-w-[600px] mx-auto"
    :lock-scroll="true"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    teleport-to="#__nuxt"
  >
    <button class="btn btn-sm btn-circle absolute right-2 top-2 z-10 sm:z-0" @click="$emit('update:modelValue')">
      <Icon size="20px" name="material-symbols:close-rounded" />
    </button>
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
:deep() {
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
      padding-top: rem(40);
      position: relative;

      @media (max-width: 640px) {
        transform: none;
        border-radius: 0;
        max-height: none;
      }
    }
  }
}
</style>
