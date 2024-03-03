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
<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: 0.3;
  z-index: -1;
  background: white;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 100%, 50%, 1);
    background-image: radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
      radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
      radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
      radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
      radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%),
      radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%);
  }
}
</style>
