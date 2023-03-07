<template>
  <div class="card w-full mx-auto max-w-sm rounded-2xl bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title mb-5">Sign up</h2>
      <form class="space-y-6" @submit.prevent>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
          <input
            id="email"
            v-model="email"
            name="email"
            class="input input-primary input-bordered w-full"
            placeholder="your@email.com"
          />
          <label v-if="$v.email.$error" class="label">
            <span v-for="(error, idx) in $v.email.$errors" :key="idx" class="label-text-alt text-error">
              {{ error.$message }}
            </span>
          </label>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium">Your password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            placeholder="••••••••"
            class="input input-primary input-bordered w-full"
          />
          <label v-if="$v.password.$error" class="label">
            <span v-for="(error, idx) in $v.password.$errors" :key="idx" class="label-text-alt text-error">
              {{ error.$message }}
            </span>
          </label>
        </div>
        <button
          class="btn btn-primary btn-block rounded-full"
          :class="{
            loading: isLoading,
          }"
          @click="register"
        >
          Sign up
        </button>
        <div class="text-sm font-medium">
          Already registered?
          <nuxt-link to="/auth/login" class="text-primary hover:underline">Sign in</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email as isEmal, minLength } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'

const supabase = useSupabaseClient()
const toast = useToast()

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
          toast.error('User does not exist. Check your email and password')
          break

        default:
          toast.error('Something went wrong')

          break
      }

      return
    }
    return navigateTo('/dashboard')
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

watch([email, password], () => {
  $v.value.$reset()
})
</script>
