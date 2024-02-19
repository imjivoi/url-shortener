<template>
  <div class="flex justify-center items-center mt-10">
    <div class="max-w-sm w-full shadow rounded-xl overflow-hidden">
      <img :src="data?.image_url" class="w-full" />
      <div class="p-4 grid gap-2">
        <h1 class="text-2xl font-bold">{{ data?.title }}</h1>
        <p>{{ data?.description }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

definePageMeta({
  middleware: 'alias',
})
const route = useRoute('alias')

const { pending, data } = await useFetch(`/api/links/alias/${route.params.alias}`)

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description || '',
  ogDescription: data.value?.description || '',
  ogImage: data.value?.image_url || '',
  ogSiteName: data.value?.redirect_url,
})
</script>
