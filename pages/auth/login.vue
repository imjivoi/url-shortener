<template>
  <u-card class="w-full mx-auto max-w-sm rounded-2xl overflow-hidden relative">
    <div class="p-5">
      <h2 class="text-2xl font-bold text-center mb-5 first-letter:uppercase">
        {{
          // $t('auth.login')
          'Login'
        }}
      </h2>
      <form class="space-y-4" @submit.prevent>
        <div>
          <label class="mb-2 text-xs first-letter:uppercase">Email</label>

          <u-input v-model="email" class="mt-2" :status="$v.email.$error ? 'error' : 'success'" />
          <small v-if="$v.email.$error" class="text-xs">
            <span v-for="(error, idx) in $v.email.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </small>
        </div>
        <div>
          <label class="mb-2 text-xs first-letter:uppercase">{{ 'Password' }}</label>

          <u-input v-model="password" type="password" class="mt-2" :status="$v.password.$error ? 'error' : 'success'" />
          <small v-if="$v.password.$error" class="text-xs">
            <span v-for="(error, idx) in $v.password.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </small>
          <small class="text-right text-xs text-gray-400 block my-4">
            <nuxt-link to="/auth/recover-request" class="hover:underline underline-offset-4">Forgot your password?</nuxt-link>
          </small>
        </div>
        <u-button :loading="isLoading" class="rounded-full" block @click="login">
          {{ 'Login' }}
        </u-button>

        <div class="mt-4 text-sm">
          Not registered yet?
          <nuxt-link to="/auth/register" class="hover:underline underline-offset-4 text-primary-500 font-bold">
            Create an account
          </nuxt-link>
        </div>
      </form>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email as isEmal, minLength } from '@vuelidate/validators'

// const { t } = useI18n()

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Authorization`,
})
const toast = useToast()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const success = ref(false)

const rules = {
  email: { required, isEmal },
  password: { required, minLength: minLength(6) },
}

const $v = useVuelidate(rules, { email, password })

const login = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return
  isLoading.value = true
  try {
    const { error } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    if (error) {
      switch (error.status) {
        default:
          // toast.error(t('messages.something_went_wrong'))
          break
      }
      return
    }
    navigateTo('/dashboard')
  } catch (error) {
    if (error.status === 400) {
      toast.add({ color: 'red', description: error.message })
    }
  } finally {
    isLoading.value = false
  }
}

watch([email, password], () => {
  $v.value.$reset()
})
</script>
