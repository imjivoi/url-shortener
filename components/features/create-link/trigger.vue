<template>
  <div class="p-4 w-full sm:w-auto bg-gray-200 dark:bg-gray-800 rounded-xl">
    <h2 class="text-center font-bold text-xl mb-4 hidden first-letter:uppercase">Paste your url</h2>
    <form class="flex gap-2 items-center" @submit.prevent>
      <div class="relative flex-1 sm:flex-auto">
        <u-input
          v-model="url"
          :disabled="isLoading"
          :status="$v.url.$error ? 'error' : 'success'"
          placeholder="Paste your url here"
        />
        <small v-if="$v.url.$error" class="text-xs absolute left-0 top-[100%]">
          <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="block w-max text-red-500">
            {{ error.$message }}
          </span>
        </small>
      </div>
      <div class="flex gap-2">
        <u-button :loading="isLoading" @click="create">
          <icon name="ph:magic-wand-fill" />
          Short
        </u-button>
        <u-button variant="ghost" @click="openCreateModal">Create</u-button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, url as isUrl } from '@vuelidate/validators'

import { FeaturesCreateLinkModal } from '#components'

const modal = useModal()

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
    const response = await $fetch('/api/links', {
      method: 'POST',
      body: {
        original_url: url.value,
      },
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    emits('success', response)
    // message.success('Link successfully created')
    url.value = ''
  } catch (error: any) {
    if (error.data?.statusCode === 403) {
      // message.error(error?.data?.statusMessage || error?.data?.message || 'You reached links limit')
    } else {
      // message.error(error?.data?.statusMessage || error?.data?.message || 'Something went wrong')
    }
  } finally {
    isLoading.value = false
  }
}

function openCreateModal() {
  modal.open({
    component: FeaturesCreateLinkModal,
    bind: {
      defaultUrl: url.value,
      onSuccess: () => {
        emits('success')
      },
    },
  })
}

watch(url, () => {
  $v.value.$reset()
})
</script>
