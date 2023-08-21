<template>
  <section>
    <div class="py-28 rounded-[40px] relative overflow-hidden">
      <div>
        <div class="text-center mb-10">
          <h1 class="text-5xl font-bold mb-8">Simple way to short your link</h1>
          <p class="text-xl max-w-lg mx-auto text-gray-500">
            Create custom short links that are perfect for sharing on social media, email, and more - and start seeing
            results today
          </p>
        </div>

        <div class="flex justify-center">
          <n-button size="large" round type="primary" @click="routeTo">Get started</n-button>
        </div>
      </div>
      <div class="bg-card"></div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'

const user = useSupabaseUser()
const router = useRouter()

const routeTo = () => {
  if (user.value) {
    return router.push({ name: 'dashboard' })
  }
  router.push({ name: 'auth' })
}
</script>
