<template>
  <u-card class="w-full mx-auto max-w-sm rounded-2xl overflow-hidden relative">
    <div class="p-5">
      <h2 class="text-2xl font-bold text-center mb-5 first-letter:uppercase">
        {{
          // $t('auth.login')
          'Register'
        }}
      </h2>
      <template v-if="success">
        <p>We successfully sent confirmation email to {{ email }}</p>
      </template>
      <form class="space-y-4" @submit.prevent v-else>
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
        </div>
        <u-button :loading="isLoading" class="rounded-full" block @click="login">
          <!-- {{ $t('button.send') }} -->
          Create account
        </u-button>
        <div class="mt-4 text-sm">
          Already registered?
          <nuxt-link to="/auth/login" class="hover:underline underline-offset-4 text-primary-500 font-bold">
            Login
          </nuxt-link>
        </div>
      </form>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email as isEmal, minLength } from '@vuelidate/validators'

const { t } = useI18n()

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | ${t('authorization')}`,
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
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    navigateTo('/dashboard')
  } catch (error) {
    console.log(error)
    switch (error.status) {
      case 400:
        toast.add({ title: 'User already exists', color: 'red' })
        break
      default:
        // toast.error(t('messages.something_went_wrong'))
        break
    }
    return
  } finally {
    isLoading.value = false
  }
}

watch([email, password], () => {
  $v.value.$reset()
})
</script>
