<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalsContainer />
  <UNotifications />
  <NuxtLoadingIndicator />
</template>
<script setup>
import { ModalsContainer } from 'vue-final-modal'
defineOgImageComponent('MyTemplate')

useSeoMeta({
  title: 'Simple url shortener',
  description:
    'Create custom short links that are perfect for sharing on social media, email, and more - and start seeing results today',
  ogTitle: 'Simple url shortener',
  ogDescription:
    'Create custom short links that are perfect for sharing on social media, email, and more - and start seeing results today',
  ogSiteName: 'liny.app',
  ogType: 'website',
  ogUrl: 'https://liny.app',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>