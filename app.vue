<template>
  <NConfigProvider :theme-overrides="themeOverrides" preflight-style-disabled>
    <NMessageProvider placement="top">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ModalsContainer />
    </NMessageProvider>
  </NConfigProvider>
</template>
<script setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { ModalsContainer } from 'vue-final-modal'

import { themeOverrides } from '@/lib'
</script>
