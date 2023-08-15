<template>
  <div class="w-full mx-auto max-w-sm rounded-2xl bg-white shadow-xl">
    <div class="p-5">
      <h2 class="text-2xl font-bold text-center mb-5">Get magic link</h2>
      <template v-if="success">
        <p class="text-center">Magic link was successfully sent!🎉🎉🎉</p>
      </template>
      <template v-else>
        <form class="space-y-6" @submit.prevent>
          <div>
            <label class="mb-2 text-xs">Your email</label>

            <n-input
              v-model:value="email"
              class="mt-2"
              placeholder="your@email.com"
              :status="$v.email.$error ? 'error' : 'success'"
            />
            <label v-if="$v.email.$error" class="text-sm">
              <span v-for="(error, idx) in $v.email.$errors" :key="idx" class="text-red-500">
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
            Send
          </n-button>
        </form>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email as isEmal, minLength } from '@vuelidate/validators'
import { NInput, useMessage, NButton } from 'naive-ui'

useHead({
  titleTemplate: (titleChunk: string) => `${titleChunk} | Authorization`,
})

const supabase = useSupabaseClient()
const toast = useMessage()

const email = ref('')
const password = ref('')
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
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) {
      switch (error.status) {
        default:
          toast.error('Something went wrong')
          break
      }
      return
    }
    success.value = true
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

watch([email, password], () => {
  $v.value.$reset()
})
</script>
