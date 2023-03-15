<template>
  <div class="w-full mx-auto max-w-sm rounded-2xl bg-white shadow-xl">
    <div class="p-5">
      <h2 class="text-2xl font-bold mb-5">Sign in</h2>
      <form class="space-y-6" @submit.prevent>
        <div>
          <label class="mb-2 text-xs">Your email</label>

          <n-input
            v-model:value="email"
            class="mt-2"
            placeholder="your@email.com"
            :status="$v.email.$error && 'error'"
          />
          <label v-if="$v.email.$error" class="text-sm">
            <span v-for="(error, idx) in $v.email.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </label>
        </div>
        <div>
          <label class="mb-2 text-xs">Your password</label>

          <n-input
            v-model:value="password"
            class="mt-2"
            placeholder="••••••••"
            type="password"
            show-password-on="mousedown"
            :status="$v.password.$error && 'error'"
          />
          <label v-if="$v.password.$error" class="text-sm">
            <span v-for="(error, idx) in $v.password.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </label>
        </div>
        <n-button
          attr-type="submit"
          :loading="isLoading"
          type="primary"
          size="large"
          class="!rounded-full w-full"
          @click="login"
        >
          Sign in
        </n-button>
        <div class="text-sm font-medium">
          Not registered?
          <nuxt-link to="/auth/register" class="!text-blue-600 hover:underline">Create account</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email as isEmal, minLength } from '@vuelidate/validators'
import { NInput, useMessage, NButton } from 'naive-ui'

const supabase = useSupabaseClient()
const toast = useMessage()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const rules = {
  email: { required, isEmal },
  password: { required, minlength: minLength(6) },
}

const $v = useVuelidate(rules, { email, password })

const login = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    if (error) {
      switch (error.status) {
        case 400:
          toast.error('User does not exist. Check your email and password')
          break

        default:
          toast.error('Something went wrong')
          break
      }

      return
    }
    setTimeout(() => {
      return navigateTo('/dashboard')
    }, 1000)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

watch([email, password], () => {
  $v.value.$reset()
})
</script>
