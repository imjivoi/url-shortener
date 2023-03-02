<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6" @submit.prevent>
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="input input-primary input-bordered w-full"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="••••••••"
          class="input input-primary input-bordered w-full"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-full" :class="{ loading: isLoading }" @click="register">
        Create account
      </button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?
        <nuxt-link to="/auth/login" class="text-primary">Sign in</nuxt-link>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const register = async () => {
  isLoading.value = true
  try {
    await supabase.auth.signUp({ email: email.value, password: password.value })
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
</script>
