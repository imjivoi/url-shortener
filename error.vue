<template>
  <app-header />
  <main class="h-[90%] flex items-center justify-center">
    <div class="text-center relative">
      <h1 class="font-bold text-6xl text-8xl">{{ error.statusCode }}</h1>
      <p class="text-gray-500 mb-5">{{ error.statusMessage }}</p>
      <u-button size="xl" @click="handleError">Home page</u-button>
    </div>
  </main>
</template>
<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>
<style scoped lang="scss"></style>
