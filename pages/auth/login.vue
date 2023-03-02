<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6" action="#">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          class="input input-primary input-bordered"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary btn-full">Login to your account</button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?
        <nuxt-link to="/auth/register" class="text-primary hover:underline">Create account</nuxt-link>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>
