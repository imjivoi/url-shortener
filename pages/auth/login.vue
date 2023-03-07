<template>
  <div class="card w-full mx-auto max-w-sm rounded-2xl bg-base-100 shadow-xl sm:p-6 md:p-8">
    <div class="card-body">
      <h3 class="card-title">Sign in to our platform</h3>
      <form class="space-y-6" @submit.prevent>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
          <input
            id="email"
            type="email"
            name="email"
            class="input input-primary input-bordered"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium">Your password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            class="input input-primary input-bordered"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-full" @click="login">Login to your account</button>
        <div class="text-sm font-medium ">
          Not registered?
          <nuxt-link to="/auth/register" class="text-primary hover:underline">Create account</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const login = async () => {
  isLoading.value = true
  try {
    await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    await navigateTo('/dashboard')
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
</script>
