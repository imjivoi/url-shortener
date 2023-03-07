<template>
  <div>
    {{ $t('welcome') }}
  </div>
  <div>
    <it-button
      round
      variant="primary"
      @click="
        notification({
          title: 'Task is deleted',
          text: 'Your task has been deleted',
          variant: 'danger',
          placement: 'bottom-right',
          progress: true,
        })
      "
    >
      button
    </it-button>
  </div>
  <it-button @click="defaultModal = true">Modal</it-button>
  <it-modal v-model="defaultModal">
    <template #image>
      <img
        src="https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
      />
    </template>

    <template #header>
      <h3 style="margin: 0">Header</h3>
    </template>

    <template #body>
      <p>Modal body. You can put here whatever you want: forms, images, text</p>
    </template>
    <template #actions>
      <it-button variant="primary" @click="notification({ text: 'You got it' }), (defaultModal = false)">
        Got it
      </it-button>
    </template>
  </it-modal>
</template>
<script lang="ts" setup>
import { useNotification } from 'equal-vue'

const notification = useNotification()
const defaultModal = ref(false)
</script>
