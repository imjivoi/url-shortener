<template>
  <div class="w-full mx-auto max-w-sm rounded-2xl bg-white shadow-xl">
    <div class="p-5">
      <h2 class="text-2xl font-bold mb-5">Sign up</h2>
      <form class="space-y-6" @submit.prevent>
        <div>
          <label class="mb-2 text-xs">Your email</label>

          <n-input
            v-model:value="email"
            class="mt-2"
            placeholder="your@email.com"
            :status="$v.password.$error && 'error'"
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
            type="password"
            show-password-on="mousedown"
            class="mt-2"
            placeholder="••••••••"
            :status="$v.password.$error && 'error'"
          />
          <label v-if="$v.password.$error" class="text-sm">
            <span v-for="(error, idx) in $v.password.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </label>
        </div>
        <n-button type="primary" size="large" class="!rounded-full w-full" :loading="isLoading" @click="register">
          Sign up
        </n-button>
        <div class="text-sm font-medium">
          Already registered?
          <nuxt-link to="/auth/login" class="!text-blue-600 hover:underline">Sign in</nuxt-link>
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

const register = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return

  isLoading.value = true
  try {
    const { error } = await supabase.auth.signUp({ email: email.value, password: password.value })
    if (error) {
      switch (error.status) {
        case 400:
          toast.error('User already exists')
          break

        default:
          toast.error('Something went wrong')

          break
      }

      return
    }
    setTimeout(() => {
      return navigateTo('/dashboard')
    }, 2000)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

watch([email, password], () => {
  $v.value.$reset()
})
</script>
