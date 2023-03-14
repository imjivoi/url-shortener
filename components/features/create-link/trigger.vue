<template>
  <div
    class="flex gap-2 items-center p-4 bg-gradient-to-r from-yellow-100 via-red-50 to-purple-100 rounded-2xl shadow shadow-yellow-400/50"
  >
    <div class="relative">
      <n-input
        v-model:value="url"
        :disabled="isLoading"
        :status="$v.url.$error ? 'error' : 'success'"
        round
        placeholder="Url to short"
      />
      <label v-if="$v.url.$error" class="text-xs absolute left-0 top-[100%]">
        <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="block w-max text-red-500">
          {{ error.$message }}
        </span>
      </label>
    </div>
    <n-button trong secondary type="primary" :loading="isLoading" round @click="create">Short</n-button>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, url as isUrl } from '@vuelidate/validators'
import { NButton, NInput, useMessage } from 'naive-ui'

const message = useMessage()

const url = ref('')

const isLoading = ref(false)

const rules = {
  url: { isUrl, required },
}

const $v = useVuelidate(rules, { url })

const emits = defineEmits(['success'])

const create = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return
  isLoading.value = true
  try {
    await $fetch('/api/links', {
      method: 'POST',
      body: {
        original_url: url.value,
      },
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    emits('success')
    message.success('Link successfully created')
    url.value = ''
  } catch (error: any) {
    if (error.data?.statusCode === 403) {
      message.error(error?.data?.statusMessage || error?.data?.message || 'You reached links limit')
    } else {
      message.error(error?.data?.statusMessage || error?.data?.message || 'Something went wrong')
    }
  } finally {
    isLoading.value = false
  }
}

watch(url, () => {
  $v.value.$reset()
})
</script>
