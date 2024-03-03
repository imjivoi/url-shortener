<template>
  <div>
    <h1 class="text-4xl font-bold my-10">Blog</h1>
  </div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
    <nuxt-link :to="article._path" v-for="(article, idx) in articles" :key="idx">
      <article class="rounded-2xl bg-gray-50 dark:bg-gray-800 overflow-hidden hover:shadow transition-all">
        <div>
          <img :src="article.image" class="max-h-[172px]" />
        </div>
        <div class="p-4 grid gap-4">
          <h3 class="font-semibold line-clamp-3">
            {{ article.title }}
          </h3>
          <div class="flex gap-4 justify-start items-center text-gray-500 dark:text-gray-400 text-xs">
            <span>
              {{ article.createdAt }}
            </span>
            <span>{{ article.readingTime }}</span>
          </div>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
const { data: articles } = await useAsyncData('blog', () => queryContent('/blog').find())

defineOgImageComponent('MyTemplate', {
  title: 'Blog',
  siteName: 'liny.app/blog',
})

useSeoMeta({
  title: 'Blog',
  ogTitle: 'Blog',
})
</script>
