<template>
  <widget-header />
  <main class="h-full ">
    <div class="container px-4 lg:max-w-5xl pt-16 mx-auto h-full">
      <slot />
    </div>
  </main>
  <widget-footer />
</template>
<script lang="ts" setup>
import { WidgetFooter } from 'widgets/footer'
import { WidgetHeader } from 'widgets/header'
</script>
