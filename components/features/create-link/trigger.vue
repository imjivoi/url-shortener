<template>
  <div class="flex gap-2 items-center p-4 w-full sm:w-auto">
    <h2 class="text-center font-bold text-xl mb-4 hidden">Paste your url</h2>
    <div class="relative flex-1 sm:flex-auto">
      <n-input
        v-model:value="url"
        :disabled="isLoading"
        :status="$v.url.$error ? 'error' : 'success'"
        round
        placeholder="Url to short"
        size="large"
      />
      <label v-if="$v.url.$error" class="text-xs absolute left-0 top-[100%]">
        <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="block w-max text-red-500">
          {{ error.$message }}
        </span>
      </label>
    </div>
    <n-button
      attr-type="submit"
      strong
      secondary
      size="large"
      type="primary"
      :loading="isLoading"
      round
      @click="create"
    >
      Short
    </n-button>
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
<style scoped lang="scss">
.shadow-gradient {
  > h2 {
    display: block;
  }
  @apply block max-w-[600px] max-h-[600px] w-full h-full relative mx-auto;
  .n-button {
    @apply mt-4;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 400%;
    z-index: -1;
    filter: blur(100px);
    @apply bg-gradient-to-r from-yellow-100 via-red-100 to-purple-100 rounded-full;
    background-size: 200% 200%;

    @media (min-width: 960px) {
      animation: gradient 15s ease infinite;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
