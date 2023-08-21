<template>
  <shared-modal @update:model-value="close">
    <template #title>{{ $t('update_link') }}</template>
    <form class="flex flex-col gap-2" @submit.prevent>
      <div>
        <label class="mb-2 text-xs">Url</label>

        <n-input
          v-model:value="url"
          class="mt-2"
          label-top=""
          :status="$v.url.$error && 'error'"
          placeholder="https://facebook.com/profile/myprofile"
        />
        <label v-if="$v.url.$error" class="text-sm">
          <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="text-red-500">
            {{ error.$message }}
          </span>
        </label>
      </div>
      <div>
        <div class="relative flex items-end justify-between gap-2">
          <div>
            <label class="text-xs">{{ $t('short_url') }}</label>
            <n-input
              v-model:value="alias"
              class="input mt-2"
              placeholder="my-link"
              :status="(aliasError || $v.alias.$error) && 'error'"
            >
              <template #prefix>
                <span class="text-gray-500">
                  {{ config.public.DOMAIN_URL + '/' }}
                </span>
              </template>
            </n-input>
          </div>

          <n-button class="hidden sm:flex flex-1" quaternary type="primary" @click="generateAlias">
            {{ $t('button.generate') }}
          </n-button>
          <n-button class="sm:hidden" circle ghost type="primary" @click="generateAlias">
            <template #icon>
              <Icon name="material-symbols:auto-mode-rounded" />
            </template>
          </n-button>
        </div>
        <label v-if="aliasError || $v.alias.$error" class="text-sm">
          <span v-if="aliasError" class="text-red-500">{{ aliasError }}</span>
          <template v-if="$v.alias.$error">
            <span v-for="(error, idx) in $v.alias.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </template>
        </label>
      </div>
      <!-- <div>
        <label class="mt-2 text-xs">Title</label>
        <n-input
          v-model:value="title"
          class="mb-2"
          :status="$v.title.$error && 'error'"
          placeholder="My facebook profile"
        />
        <label v-if="$v.title.$error" class="text-sm">
          <span v-for="(error, idx) in $v.title.$errors" :key="idx" class="text-red-500">
            {{ error.$message }}
          </span>
        </label>
      </div> -->
    </form>
    <template #footer>
      <div class="flex justify-center gap-4">
        <n-button type="primary" :loading="isLoading" @click="create">{{ $t('button.update') }}</n-button>
        <n-button @click="close">{{ $t('button.cancel') }}</n-button>
      </div>
    </template>
  </shared-modal>
</template>
<script lang="ts" setup>
// eslint-disable-next-line import/no-named-as-default
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required, url as isUrl } from '@vuelidate/validators'
import { NInput, NButton, useMessage } from 'naive-ui'

import { LinkType } from 'types'

interface Props {
  onSuccess: () => void
  link: Partial<LinkType>
}

const { link, onSuccess } = defineProps<Props>()
const config = useRuntimeConfig()
const emits = defineEmits(['success', 'update:modelValue'])
const toast = useMessage()

const title = ref(link.title || '')
const url = ref(link.original_url || '')
const alias = ref(link.alias || '')

const aliasError = ref('')

const isLoading = ref(false)

const rules = {
  title: { minLength: minLength(3), maxLength: maxLength(20) },
  url: { isUrl, required },
  alias: { minLength: minLength(3), maxLength: maxLength(20), required },
}

const $v = useVuelidate(rules, { title, url, alias })

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const create = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return
  isLoading.value = true
  try {
    await $fetch(`/api/links/${link.id}`, {
      method: 'PUT',
      body: {
        title: title.value,
        original_url: url.value,
        alias: alias.value,
      },
      headers,
    })
    close()
    onSuccess()
  } catch (error: any) {
    if (error.statusCode === 403) {
      toast.error(error?.statusMessage || 'You reached links limit')
    }
  } finally {
    isLoading.value = false
  }
}
const close = () => {
  emits('update:modelValue', false)
}
const resetErrors = () => {
  $v.value.$reset()
  aliasError.value = ''
}

const generateAlias = () => {
  alias.value = getRandomAlias()
}

const checkAlias = async () => {
  try {
    const response = await $fetch(`/api/links/alias/check/${alias.value}`, { headers })
    if (response.exists) {
      aliasError.value = 'Alias already exist'
    }
  } catch (error) {}
}

watch(alias, (val) => {
  if (val) {
    checkAlias()
  }
})

watch([alias, title, url], () => {
  resetErrors()
})
</script>
