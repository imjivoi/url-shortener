<template>
  <shared-ui-modal @update:model-value="close">
    <it-loading-bar global infinite />
    <template #title>New link</template>
    <form class="flex flex-col gap-2" @submit.prevent>
      <div>
        <div class="relative flex items-end gap-2">
          <it-input
            v-model="alias"
            class="input"
            :prefix="config.public.DOMAIN_URL + '/'"
            label-top="Short url"
            placeholder="my-link"
            :variant="(aliasError || $v.alias.$error) && 'danger'"
          />

          <it-button class="hidden sm:flex" outlined variant="primary" @click="generateAlias">Generate</it-button>
          <it-button class="sm:hidden rounded-full" round outlined variant="primary" @click="generateAlias">
            <template #icon>
              <Icon name="material-symbols:auto-mode-rounded" />
            </template>
          </it-button>
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
      <div>
        <it-input
          v-model="title"
          label-top="Title"
          :variant="$v.title.$error && 'danger'"
          placeholder="My facebook profile"
        />
        <label v-if="$v.title.$error" class="text-sm">
          <span v-for="(error, idx) in $v.title.$errors" :key="idx" class="text-red-500">
            {{ error.$message }}
          </span>
        </label>
      </div>
      <div>
        <it-input
          v-model="url"
          label-top="Url"
          :variant="$v.url.$error && 'danger'"
          placeholder="https://facebook.com/profile/myprofile"
        />
        <label v-if="$v.url.$error" class="text-sm">
          <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="text-red-500">
            {{ error.$message }}
          </span>
        </label>
      </div>
    </form>
    <template #footer>
      <div class="flex justify-center gap-4">
        <it-button variant="primary" :loading="isLoading" @click="create">Create</it-button>
        <it-button @click="close">Cancel</it-button>
      </div>
    </template>
  </shared-ui-modal>
</template>
<script lang="ts" setup>
// eslint-disable-next-line import/no-named-as-default
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required, url as isUrl } from '@vuelidate/validators'
import { nanoid } from 'nanoid'

interface Props {
  onSuccess: () => void
}

const props = defineProps<Props>()
const config = useRuntimeConfig()
const emits = defineEmits(['success', 'update:modelValue'])

const title = ref('')
const url = ref('')
const alias = ref('')
const aliasError = ref('')

const isLoading = ref(false)

const rules = {
  title: { minLength: minLength(3), maxLength: maxLength(20), required },
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
    await $fetch('/api/links', {
      method: 'POST',
      body: {
        title: title.value,
        original_url: url.value,
        alias: alias.value,
      },
      headers,
    })
    close()
    props.onSuccess()
  } catch (error) {
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
  alias.value = nanoid(10)
}

const checkAlias = async () => {
  try {
    const response = await $fetch(`/api/links/alias/${alias.value}`, { headers })
    if (response) {
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
