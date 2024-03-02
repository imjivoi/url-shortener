<script setup lang="ts">
defineProps(['toc'])
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 font-bold rounded-lg text-sm" aria-label="Table of Content">
    <header class="py-3 px-7">
      <h3 class="text-gray-400 dark:text-gray-500">In this article</h3>
    </header>
    <div class="py-3">
      <div v-for="(item, index) in toc" :key="index">
        <NuxtLink class="py-2 block pl-7 text-gray-600 dark:text-gray-200" :to="`#${item.id}`">
          {{ item.text }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>