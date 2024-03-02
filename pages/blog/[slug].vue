<template>
  <div class="">
    <h1 class="text-3xl font-bold mb-6">{{ data.title }}</h1>

    <div class="flex justify-start gap-4 text-gray-500 dark:text-gray-400 text-sm mb-10">
      <span>Created at {{ data.createdAt }}</span>
      &middot;
      <span>Read time {{ data.readingTime }}</span>
    </div>
    <img :src="data.image" class="rounded-xl" />
    <TableOfContent :toc="toc.links" v-if="toc" class="my-4" />
    <div>
      <article
        class="prose prose-stone max-w-full dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-slate-700 dark:prose-pre:text-gray-50 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:border-solid prose-pre:rounded-lg prose-pre:text-gray-800 prose-headings:text-primary-600 dark:prose-hr:border-gray-700 dark:prose-li:marker:text-gray-200 dark:prose-blockquote:border-gray-200 prose-headings:scroll-mt-24"
      >
        <ContentRenderer :value="data"></ContentRenderer>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('blog-slug')
const { data } = await useAsyncData('blog', () => queryContent(route.path).findOne())

defineOgImageComponent('BlogTemplate', {
  title: data.title,
  description: data.description,
  image: data.image,
})

const { toc } = useContent()

useSeoMeta({
  title: data.title,
  description: data.description,
  image: data.image,
  url: route.fullPath,
  type: 'article',
  article: {
    publishedTime: data.createdAt,
    modifiedTime: data.createdAt,
  },
  ogTitle: data.title,
  ogDescription: data.description,
})

defineOgImageComponent('BlogTemplate', {
  title: data.title,
  description: data.description,
  image: data.image,
  url: route.fullPath,
})
</script>
