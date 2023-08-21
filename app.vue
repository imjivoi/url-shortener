<template>
  <div class="background"></div>
  <NConfigProvider :theme-overrides="themeOverrides" preflight-style-disabled>
    <NMessageProvider placement="top">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ModalsContainer />
    </NMessageProvider>
  </NConfigProvider>
  <NuxtLoadingIndicator />
</template>
<script setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { ModalsContainer } from 'vue-final-modal'

import { themeOverrides } from '@/lib'

const { t } = useI18n()

const i18nHead = useLocaleHead({
  addSeoAttributes: {
    canonicalQueries: ['foo'],
  },
})
useHead({
  title: t('head.title'),
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    {
      name: 'description',
      content: t('head.description'),
    },
    {
      name: 'keywords',
      content: t('head.keywords'),
    },
    {
      hid: 'og:title',
      name: 'og:title',
      property: 'og:title',
      content: t('head.title'),
    },
    {
      hid: 'og:description',
      name: 'og:description',
      property: 'og:description',
      content: t('head.description'),
    },
  ],
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
