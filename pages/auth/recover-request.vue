<template>
  <u-card class="w-full mx-auto max-w-sm rounded-2xl overflow-hidden relative">
    <div class="p-5">
      <h2 class="text-2xl font-bold text-center mb-5 first-letter:uppercase">
        {{
          // $t('auth.login')
          'Request password reset'
        }}
      </h2>
      <template v-if="success">
        <p class="text-center first-letter:uppercase">We successfuly sent reset link to your email</p>
      </template>
      <template v-else>
        <form class="space-y-6" @submit.prevent>
          <div>
            <label class="mb-2 text-xs first-letter:uppercase">Your email</label>

            <u-input
              v-model="email"
              class="mt-2"
              placeholder="12345@email.com"
              :status="$v.email.$error ? 'error' : 'success'"
            />
            <small v-if="$v.email.$error" class="text-xs">
              <span v-for="(error, idx) in $v.email.$errors" :key="idx" class="text-red-500">
                {{ error.$message }}
              </span>
            </small>
          </div>
          <u-button :loading="isLoading" class="rounded-full" block @click="login">Send</u-button>
        </form>
      </template>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email as isEmal, minLength } from '@vuelidate/validators'

// const { t } = useI18n()
const toast = useToast()

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Authorization`,
})
// const toast = useMessage()

const email = ref('')
const isLoading = ref(false)
const success = ref(false)

const rules = {
  email: { required, isEmal },
}

const $v = useVuelidate(rules, { email })

const login = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return
  isLoading.value = true
  try {
    await $fetch('/api/auth/recover-request', {
      method: 'POST',
      body: { email: email.value },
    })
    success.value = true
    // navigateTo('/dashboard')
  } catch (error) {
    toast.add({ title: 'Something went wrong', color: 'red' })
  } finally {
    isLoading.value = false
  }
}

watch([email], () => {
  $v.value.$reset()
})
</script>
