<template>
  <div class="flex flex-col items-center min-h-screen">
    <div class="text-center my-6">
      <h1 class="text-2xl font-bold mb-2">Redirecting you to your destination</h1>
      <p class="text-gray-600">
        You will be redirected in
        <span class="font-bold text-xl">{{ counter }}</span>
        seconds
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import '@/assets/ad.js'

definePageMeta({
  layout: false,
})

const route = useRoute()
const counter = ref(8)
const alias = route.params.alias as string

// Get the original URL for the current alias
const { data: linkData } = await useAsyncData(async () => {
  const host = useRequestHeader('host')
  const link = await $fetch(`/api/links/domain/${host}/alias/${alias}`)
  return link.original_url
})

// // Create a countdown timer and redirect when it reaches 0
// onMounted(() => {
//   const timer = setInterval(() => {
//     counter.value--
//     if (counter.value <= 0) {
//       clearInterval(timer)
//       navigateTo(linkData.value, { external: true, replace: true })
//     }
//   }, 1000)
// })

function runTimer() {
  const timer = setInterval(() => {
    counter.value--
    if (counter.value <= 0) {
      clearInterval(timer)
      navigateTo(linkData.value, { external: true, replace: true })
    }
  }, 1000)
}

onMounted(async () => {
  const script = document.createElement('script')
  script.src = 'https://js.onclckmn.com/static/onclicka.js'
  script.dataset.admpid = '306593'
  script.async = true
  document.head.appendChild(script)
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const element = document.querySelector('#i_s_a_overlay')
  element?.click()
  runTimer()
})
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
