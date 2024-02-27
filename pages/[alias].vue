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
  middleware: 'alias',
})

const { data } = await useAsyncData(async (ctx) => {
  const alias = ctx?._route.params.alias as string
  const vercelHeaders = [
    'x-vercel-ip-country',
    'x-vercel-ip-country-region',
    'x-vercel-ip-city',
    'x-vercel-ip-latitude',
    'x-vercel-ip-longitude',
    'x-vercel-ip-timezone',
  ]
  console.time('fetch link')
  try {
    const headers = useRequestHeaders(['cookie', 'x-forwarded-for', 'user-agent', ...vercelHeaders]) as Record<
      string,
      string
    >
    const host = useRequestHeader('host')

    const link = await $fetch(`/api/links/domain/${host}/alias/${alias}`)

    return link
  } catch (error) {
    console.log(error)
    return navigateTo('/')
  }
})

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description || '',
  ogDescription: data.value?.description || '',
  ogImage: data.value?.image_url || '',
  ogSiteName: data.value?.original_url,
})
</script>
