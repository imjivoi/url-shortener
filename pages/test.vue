<template><div></div></template>
<script lang="ts" setup>
onMounted(async () => {
  const result = await $fetch('/api/test', { headers: useRequestHeaders(['x-forwarded-for', 'x-vercel-ip-city']) })
  console.log(result)
})
</script>
