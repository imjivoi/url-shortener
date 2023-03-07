<template><div></div></template>
<script lang="ts" setup>
onMounted(async () => {
  const result = await $fetch('/api/test')
  console.log(result)
})
</script>
