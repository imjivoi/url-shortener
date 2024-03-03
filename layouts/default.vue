<template>
  <div class="flex flex-col justify-between h-full">
    <app-header />
    <main class="h-full">
      <div class="container px-10 lg:max-w-5xl pt-8 pb-16 mx-auto">
        <slot />
      </div>
    </main>
    <app-footer />
  </div>
</template>
<script lang="ts" setup></script>
