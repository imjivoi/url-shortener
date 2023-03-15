<template>
  <NConfigProvider :theme-overrides="themeOverrides" preflight-style-disabled class="h-screen">
    <widgets-header />
    <main class="h-[90%] flex items-center justify-center">
      <div class="text-center relative">
        <h1 class="font-bold text-6xl text-8xl">{{ error.statusCode }}</h1>
        <p class="text-gray-500 mb-5">{{ error.statusMessage }}</p>
        <n-button round type="primary" size="large" @click="handleError">Home page</n-button>
      </div>
    </main>
  </NConfigProvider>
</template>
<script setup>
import { NButton, NConfigProvider } from 'naive-ui'

import { themeOverrides } from '@/lib'

const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>
<style scoped lang="scss">
main > div.relative:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400%;
  height: 400%;
  z-index: -1;
  filter: blur(100px);
  @apply bg-gradient-to-r from-yellow-100 via-red-100 to-purple-100 rounded-full;
  background-size: 200% 200%;
}
</style>
