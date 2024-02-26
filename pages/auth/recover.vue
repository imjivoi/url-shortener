<template>
  <u-card class="w-full mx-auto max-w-sm rounded-2xl overflow-hidden relative">
    <div class="p-5">
      <h2 class="text-2xl font-bold text-center mb-5 first-letter:uppercase">Confirm your new password</h2>
      <form class="space-y-6" @submit.prevent>
        <div>
          <label class="mb-2 text-xs first-letter:uppercase">{{ 'New pasword' }}</label>

          <u-input v-model="password" class="mt-2" type="password" :status="$v.password.$error ? 'error' : 'success'" />
          <small v-if="$v.password.$error" class="text-xs">
            <span v-for="(error, idx) in $v.password.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </small>
        </div>
        <div>
          <label class="mb-2 text-xs first-letter:uppercase">{{ 'Repeat new pasword' }}</label>

          <u-input
            v-model="passwordRepeat"
            class="mt-2"
            type="password"
            :status="$v.passwordRepeat.$error ? 'error' : 'success'"
          />
          <small v-if="$v.passwordRepeat.$error" class="text-xs">
            <span v-for="(error, idx) in $v.passwordRepeat.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </small>
        </div>
        <u-button :loading="isLoading" class="rounded-full" block @click="login">
          {{ 'Send' }}
        </u-button>
      </form>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'

const toast = useToast()

const route = useRoute('auth-recover')

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Authorization`,
})
// const toast = useMessage()

const password = ref('')
const passwordRepeat = ref('')
const isLoading = ref(false)
const success = ref(false)

const rules = {
  password: { required },
  passwordRepeat: { required, sameAs: sameAs(password) },
}

const $v = useVuelidate(rules, { password, passwordRepeat })

const login = async () => {
  const params = new URLSearchParams(route.hash.replace('#', ''))

  const accessToken = params.get('access_token')
  const refreshToken = params.get('refresh_token')
  const isValid = await $v.value.$validate()
  if (!isValid) return

  if (!accessToken || !refreshToken) {
    toast.add({ title: 'No token', color: 'red' })
    return
  }
  isLoading.value = true
  try {
    await $fetch('/api/auth/recover', {
      method: 'POST',
      body: { password: password.value, access_token: accessToken, refresh_token: refreshToken },
    })
    success.value = true
    navigateTo('/dashboard')
  } catch (error) {
    if (error.status === 422) {
      toast.add({ title: ' New password should be different from the old password', color: 'red' })
      return
    }
    toast.add({ title: error.message, color: 'red' })
  } finally {
    isLoading.value = false
  }
}

watch([password, passwordRepeat], () => {
  $v.value.$reset()
})
</script>
