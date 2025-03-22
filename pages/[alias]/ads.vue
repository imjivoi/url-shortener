<template>
  <div>
    <h1>Ads</h1>
  </div>
</template>

<script setup lang="ts">
// import '@/assets/ad.js'

definePageMeta({
  layout: false,
})
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://shebudriftaiter.net/tag.min.js'
  script.setAttribute('data-zone', '9120688')
  script.setAttribute('data-cfasync', 'false')
  document.body.appendChild(script)
})

{
  /* 
useHead({
  script: [
    {
      src: '/ad.js',
      async: true,
    },
    {
      src: '//madurird.com/tag.min.js',
      dataset: {
        zone: '9120688',
        cfasync: 'false',
      },
      async: true,
      onerror: '_mqifjt',
      onload: '_fuygrnz',
    },
  ],
}) */
}
</script>