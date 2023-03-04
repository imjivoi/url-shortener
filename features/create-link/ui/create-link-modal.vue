<template>
  <a href="#create-modal" class="btn btn-primary shadow-sm shadow-primary">
    <slot>Add your first link</slot>
  </a>
  <div id="create-modal" class="modal">
    <div class="modal-box text-left max-w-lg">
      <h3 class="font-bold text-lg text-center">New link</h3>
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
                'input-error': aliasError,
              }"
              placeholder="my-alias"
            />
            <button class="btn btn-ghost btn-sm" @click="generateAlias">Generate</button>
          </div>
          <label v-if="aliasError" class="label">
            <span class="label-text-alt text-error">{{ aliasError }}</span>
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
        </div>
      </form>
      <div class="modal-action">
        <button class="btn btn-primary" @click="create">Create</button>
        <a href="#" class="btn btn-ghost">Cancel</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required, url as isUrl } from '@vuelidate/validators'
import { nanoid } from 'nanoid'

const config = useRuntimeConfig()

const title = ref('')
const url = ref('')
const alias = ref('')

const aliasError = ref('')

const rules = {
  title: { minLength: minLength(3), maxLength: maxLength(20), required },
  url: { isUrl, required },
  alias: { minLength: minLength(3), maxLength: maxLength(20), required },
}

const $v = useVuelidate(rules, { title, url, alias })

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const create = async () => {
  await $fetch('/api/links', {
    method: 'POST',
    body: {
      title: title.value,
      original_url: url.value,
      alias: alias.value,
    },
    headers,
  })
}

const generateAlias = () => {
  alias.value = nanoid(10)
}

const checkAlias = async () => {
  try {
    const response = await $fetch(`/api/links/alias/${alias.value}`, { headers })
    if (response) {
      alias.value = 'Alias already exist'
    }
  } catch (error) {}
}

watch(alias, (val) => {
  aliasError.value = ''
  if (val) {
    checkAlias()
  }
})
</script>
