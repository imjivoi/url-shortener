<template>
  <div>
    {{ $t('welcome') }}
  </div>
</template>
<script lang="ts" setup>
import { useNotification } from 'equal-vue'

const notification = useNotification()
const defaultModal = ref(false)
</script>
