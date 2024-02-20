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
import { isCrawler } from '../server/lib'

definePageMeta({
  // middleware: 'alias',
})
const route = useRoute('alias')

await useAsyncData(async () => {
  const vercelHeaders = [
    'x-vercel-ip-country',
    'x-vercel-ip-country-region',
    'x-vercel-ip-city',
    'x-vercel-ip-latitude',
    'x-vercel-ip-longitude',
  ]
  try {
    const headers = useRequestHeaders(['cookie', 'x-forwarded-for', 'user-agent', ...vercelHeaders]) as Record<
      string,
      string
    >
    const link = await $fetch<{ original_url: string }>(`/api/storage/${route.params.alias}`)

    if (!link || !link.original_url) {
      throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    if (!isCrawler(headers['user-agent'])) {
      await navigateTo(link.original_url, {
        external: true,
        redirectCode: 301,
      })

      try {
        await $fetch(`/api/links/alias/${route.params.alias}/statistic`, {
          headers,
        })
      } catch (e) {
        console.log(e)
      }
    }
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})

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
