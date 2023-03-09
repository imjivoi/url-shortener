<template>
  <widget-header />
  <main class="h-full">
    <div class="container px-4 lg:max-w-5xl py-16 mx-auto">
      <slot />
    </div>
  </main>
</template>
<script lang="ts" setup>
import { WidgetHeader } from 'widgets/header'
</script>
