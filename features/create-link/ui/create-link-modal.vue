<template>
  <shared-ui-modal @update:model-value="close">
    <template #title>New link</template>
    <form class="flex flex-col gap-2" @submit.prevent>
      <div>
        <label class="label">
          <span class="label-text">Link alias</span>
        </label>

        <div class="relative flex items-center gap-2">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {{ config.public.DOMAIN_URL }}/
          </div>
          <input
            v-model="alias"
            type="text"
            class="input input-primary input-bordered w-full pl-44 font-bold placeholder:font-normal"
            :class="{
              'input-error': aliasError || $v.alias.$error,
            }"
            placeholder="my-alias"
          />
          <button class="btn btn-ghost btn-sm" @click="generateAlias">Generate</button>
        </div>
        <label v-if="aliasError || $v.alias.$error" class="label">
          <span v-if="aliasError" class="label-text-alt text-error">{{ aliasError }}</span>
          <template v-if="$v.alias.$error">
            <span v-for="(error, idx) in $v.alias.$errors" :key="idx" class="label-text-alt text-error">
              {{ error.$message }}
            </span>
          </template>
        </label>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          v-model="title"
          type="text"
          placeholder="My facebook profile"
          class="input input-primary input-bordered w-full"
        />
        <label v-if="$v.title.$error" class="label">
          <span v-for="(error, idx) in $v.title.$errors" :key="idx" class="label-text-alt text-error">
            {{ error.$message }}
          </span>
        </label>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Url</span>
        </label>
        <input
          v-model="url"
          type="text"
          placeholder="https://facebook.com/profile/blabla"
          class="input input-primary input-bordered w-full"
        />
        <label v-if="$v.url.$error" class="label">
          <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="label-text-alt text-error">
            {{ error.$message }}
          </span>
        </label>
      </div>
    </form>
    <template #footer>
      <div class="modal-action">
        <button
          class="btn btn-primary"
          :class="{
            loading: isLoading,
          }"
          @click="create"
        >
          Create
        </button>
        <button class="btn btn-ghost" @click="close">Cancel</button>
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
